from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_cors import CORS
import psycopg2
import bcrypt
import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app, resources={r"/submit_form": {"origins": "*"}})

# Database connection details
DB_HOST = "13.234.31.207"  # Change this to your PostgreSQL host
DB_NAME = "postgres"      # Your database name
DB_USER = "postgres"        # Your PostgreSQL username
DB_PASSWORD = "1117" # Your PostgreSQL password
DB_PORT = "5432"            # Default PostgreSQL port

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        print("Connected to the database")
        return conn
    except Exception as e:
        print("Error: Could not connect to the database.")
        print(e)
        return None

# Home page route (this is where the login button will be)
@app.route('/api')
def home():
    return render_template('home.html')

# Login page route
@app.route('/api/login', methods=['GET', 'POST'])
def login():
    try:
        data = request.get_json()  # Get JSON data instead of request.form
        username = data.get('loginCode')  # Match frontend JSON key
        password = data.get('password')

        conn = get_db_connection()
        cur = conn.cursor()

        # Fetch user details from the database
        cur.execute("SELECT username, password FROM users WHERE username = %s;", (username,))
        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            stored_password = user[1]  # Password from DB (currently plaintext)
            
            # If using bcrypt (passwords must be hashed during user registration)
            # if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):

            if password == stored_password:  # Plaintext password check (for now)
                session['user'] = username  # Store session
                return jsonify({'success': True, 'redirect': '/api/index'})
            else:
                return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        else:
            return jsonify({'success': False, 'message': 'User not found'}), 404

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/api/index')
def index():
    if 'user' in session:
        return render_template('index.html', username=session['user'])
    return redirect(url_for('home'))  # Redirect to home if not logged in

@app.route('/api/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))
# Submit form route (for contact form submission)
@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    subject = data.get('subject')
    message = data.get('message')

    if not all([name, email, phone, subject, message]):
        return jsonify({'error': 'All fields are required'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO contact_form(name, email, phone, subject, message)
        VALUES (%s, %s, %s, %s, %s)
    """, (name, email, phone, subject, message))
    
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Form submitted successfully'})

# API Routes
@app.route('/api/dashboard-summary', methods=['GET'])
def get_dashboard_summary():
    today = datetime.date.today()
    current_month_name = today.strftime('%B')  # Get full month name (e.g., January)
    current_month = today.month
    current_year = today.year

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""SELECT COALESCE(SUM(payin_amount), 0) FROM payin WHERE EXTRACT(MONTH FROM deposited_date) = %s AND EXTRACT(YEAR FROM deposited_date) = %s;""", (current_month, current_year))
    total_payin = cursor.fetchone()[0]

    cursor.execute("""SELECT COALESCE(SUM(payout_amount), 0) FROM payouts WHERE EXTRACT(MONTH FROM requested_date) = %s AND EXTRACT(YEAR FROM requested_date) = %s;""", (current_month, current_year))
    total_payout = cursor.fetchone()[0]

    cursor.execute("""SELECT working_days, nse_holidays FROM working_days WHERE month = %s;""", (current_month_name,))
    working_days_data = cursor.fetchone()

    if working_days_data:
        working_days_this_month, holidays_this_month = working_days_data
    else:
        working_days_this_month = 0
        holidays_this_month = 0

    cursor.close()
    conn.close()

    dashboard_summary = {
        "total_payin": round(total_payin, 2),
        "total_payout": round(total_payout, 2),
        "working_days_this_month": working_days_this_month,
        "holidays_this_month": holidays_this_month
    }

    return jsonify(dashboard_summary)

@app.route('/api/consultants', methods=['GET'])
def get_consultants():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT code, name, phone, email FROM consultant;')
    consultant = cursor.fetchall()
    cursor.close()
    conn.close()

    consultants_list = [
        {"code": row[0], "name": row[1], "phone": row[2], "email": row[3]}
        for row in consultant
    ]
    return jsonify(consultants_list)

@app.route('/api/payouts', methods=['GET'])
def get_payouts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT sl_no, requested_date, payout_amount, approved_date, status, comments FROM payouts;')
    payouts = cursor.fetchall()
    cursor.close()
    conn.close()

    payouts_list = [
        {
            "sl_no": row[0],
            "requested_date": row[1].strftime('%d-%b-%Y'),
            "payout_amount": row[2] if row[2] is not None else "0.00",
            "approved_date": row[3].strftime('%d-%b-%Y') if row[3] else None,
            "status": row[4],
            "comments": row[5]
        }
        for row in payouts
    ]
    return jsonify(payouts_list)

@app.route('/api/payin', methods=['GET'])
def get_payin():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT sl_no, deposited_date, payin_amount, approved_date, status FROM payin;')
    payins = cursor.fetchall()
    cursor.close()
    conn.close()

    payins_list = [
        {
            "sl_no": row[0],
            "deposited_date": row[1].strftime('%d-%b-%Y'),
            "payin_amount": row[2] if row[2] is not None else "0.00",
            "approved_date": row[3].strftime('%d-%b-%Y') if row[3] else None,
            "status": row[4]
        }
        for row in payins
    ]
    return jsonify(payins_list)

@app.route('/api/working-days', methods=['GET'])
def get_working_days():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, month, working_days, nse_holidays FROM working_days;')
    working_days = cursor.fetchall()
    cursor.close()
    conn.close()

    working_days_list = [
        {"sl_no": row[0], "month": row[1], "working_days": row[2], "nse_holidays": row[3]}
        for row in working_days
    ]
    return jsonify(working_days_list)

@app.route('/api/holidays', methods=['GET'])
def get_holidays():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT sl_no, date, day, description FROM holidays;')
    holidays = cursor.fetchall()
    cursor.close()
    conn.close()

    holidays_list = [
        {"sl_no": row[0], "date": row[1].strftime('%d-%b-%Y'), "day": row[2], "description": row[3]}
        for row in holidays
    ]
    return jsonify(holidays_list)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
