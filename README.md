# Trade-FullStack-Project

![Logo](logo.png)

A professional FullStack web application for Trade-FullStack, featuring a Flask backend, a PostgreSQL database, and a clean frontend for managing payouts, pay-ins, and consultant information.

## 🚀 Features

- **User Authentication**: Secure login system with session management.
- **Financial Dashboard**: Real-time summary of total pay-ins and payouts.
- **Consultant Management**: View and manage consultant details.
- **Transaction History**: Detailed logs for payouts and pay-ins.
- **Holiday & Working Day Tracking**: Integrated calendar for business day management.
- **Contact Form**: Direct submission system for user inquiries.

## 🛠️ Tech Stack

- **Backend**: Python 3.x, Flask
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Security**: Environment variable configuration, Password hashing (bcrypt)

## 📋 Prerequisites

- Python 3.7+
- PostgreSQL
- Git

## ⚙️ Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Trade-FullStack-Project.git
cd Trade-FullStack-Project
```

### 2. Create a Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env
```
Open `.env` and update the database connection details.

### 5. Run the Application
```bash
python server.py
```
The server will start at `http://127.0.0.1:5000`.

## 📂 Project Structure

```text
Trade-FullStack-Project/
├── static/             # Static assets
│   ├── css/            # Stylesheets (homestyles.css, indexstyle.css, login_style.css)
│   ├── js/             # Client-side scripts (HomeScript.js, indexscript.js, login_script.js)
│   └── img/            # Images and logos (logo.png, etc.)
├── templates/          # HTML templates (Home.html, index.html, login.html)
├── .env                # Environment variables (secret)
├── .env.example        # Template for env variables
├── .gitignore          # Files to ignore in Git
├── README.md           # Project documentation
├── requirements.txt    # Python dependencies
└── server.py           # Flask backend server
```

## 🔒 Security Note
Never commit your `.env` file to GitHub. The `.gitignore` file included in this repo ensures it stays local. Always use `.env.example` as a reference for others.

---
**⭐ Contributions, issues, and feature requests are welcome!**
