// Fetch Payout Data from Backend API
async function loadPayouts() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/payouts");

    if (!response.ok) {
      throw new Error("Failed to fetch payout data from the server.");
    }

    const payouts = await response.json();
    const tableBody = document.getElementById("payout-table-body");
    tableBody.innerHTML = "";

    payouts.forEach((payout, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${new Date(payout.requested_date).toLocaleDateString()}</td>
          <td>${Number(payout.payout_amount).toLocaleString()}</td>
          <td>${new Date(payout.approved_date).toLocaleDateString() || ""}</td>
          <td>${payout.status}</td>
          <td>${payout.comments || ""}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading payouts:", error);
  }
}
// Fetch My Ledger Data from Backend API
async function loadLedger() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/ledger");

    if (!response.ok) {
      throw new Error("Failed to fetch ledger data from the server.");
    }

    const ledgerEntries = await response.json();
    const tableBody = document.getElementById("ledger-table-body");
    tableBody.innerHTML = "";

    if (ledgerEntries.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5">No ledger data available.</td></tr>`;
    } else {
      ledgerEntries.forEach((entry, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${new Date(entry.date).toLocaleDateString()}</td>
            <td>${entry.description}</td>
            <td>${Number(entry.debit).toLocaleString() || ""}</td>
            <td>${Number(entry.credit).toLocaleString() || ""}</td>
            <td>${Number(entry.balance).toLocaleString()}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error loading ledger data:", error);
  }
}
// Fetch Working Days Data from Backend API
async function loadWorkingDays() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/working-days");

    if (!response.ok) {
      throw new Error("Failed to fetch working days data from the server.");
    }

    const workingDays = await response.json();
    const tableBody = document.getElementById("working-days-table-body");
    tableBody.innerHTML = "";

    if (workingDays.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No working days data available.</td></tr>`;
    } else {
      workingDays.forEach((entry, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${entry.month}</td>
            <td>${entry.working_days}</td>
            <td>${entry.nse_holidays}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error loading working days:", error);
  }
}

// Fetch Holidays Data from Backend API
async function loadHolidays() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/holidays");

    if (!response.ok) {
      throw new Error("Failed to fetch holiday data from the server.");
    }

    const holidays = await response.json();
    const tableBody = document.getElementById("holidays-table-body");
    tableBody.innerHTML = "";

    if (holidays.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No holiday data available.</td></tr>`;
    } else {
      holidays.forEach((holiday, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${new Date(holiday.date).toLocaleDateString()}</td>
            <td>${holiday.day}</td>
            <td>${holiday.description}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error loading holidays:", error);
  }
}

// Fetch My Pay In Data from Backend API
async function loadPayIns() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/payin");

    if (!response.ok) {
      throw new Error("Failed to fetch pay-in data from the server.");
    }

    const payIns = await response.json();
    const tableBody = document.getElementById("pay-in-table-body");
    tableBody.innerHTML = "";

    if (payIns.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No pay-in data available.</td></tr>`;
    } else {
      payIns.forEach((payIn, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${new Date(payIn.deposited_date).toLocaleDateString()}</td>
            <td>${Number(payIn.payin_amount).toLocaleString()}</td>
            <td>${payIn.approved_date}</td>
            <td>${payIn.status || ""}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error loading pay-ins:", error);
  }
}
// Fetch Consultants Data from Backend API
async function loadConsultants() {
  try {
    const response = await fetch("http://192.168.1.3:5000/api/consultants");

    if (!response.ok) {
      throw new Error("Failed to fetch consultant data from the server.");
    }

    const consultants = await response.json();
    const tableBody = document.getElementById("consultant-table-body");
    tableBody.innerHTML = "";

    if (consultants.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No consultant data available.</td></tr>`;
    } else {
      consultants.forEach((consultant, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${consultant.code}</td>
            <td>${consultant.name}</td>
            <td>${consultant.phone}</td>
            <td>${consultant.email}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error loading consultants:", error);
  }
}

// Event listeners for menu items

// Event listener for "Dashboard" menu item
document.getElementById("dashboard-menu").addEventListener("click", () => {
  // Show only the Dashboard section
  document.getElementById("dashboard-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("consultant-section").style.display = "none"; // Hide the Consultant

  // Hide headers for other sections
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("dashboard-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
});

// Event listener for "Payouts" menu item
document.getElementById("payout-menu").addEventListener("click", () => {
  loadPayouts();

  // Show only the Payout section
  document.getElementById("payout-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none"; // Hide the Dashboard
  document.getElementById("consultant-section").style.display = "none"; // Hide the Consultant
  
  // Update headers
  document.getElementById("payout-header").style.display = "block";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("payout-menu").classList.add("active");
  document.getElementById("dashboard-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
});

// Event listener for "Working Days" menu item
document.getElementById("working-days-menu").addEventListener("click", () => {
  loadWorkingDays();

  // Show only the Working Days section
  document.getElementById("working-days-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none"; // Hide the Dashboard
  document.getElementById("consultant-section").style.display = "none"; // Hide the Consultant

  // Update headers
  document.getElementById("working-days-header").style.display = "block";
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("working-days-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
});

// Event listener for "Holidays" menu item
document.getElementById("holidays-menu").addEventListener("click", () => {
  loadHolidays();

  // Show only the Holidays section
  document.getElementById("holidays-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none"; // Hide the Dashboard
  document.getElementById("consultant-section").style.display = "none"; // Hide the Consultant

  // Update headers
  document.getElementById("holidays-header").style.display = "block";
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("holidays-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
});

// Event listener for "Pay In" menu item
document.getElementById("pay-in-menu").addEventListener("click", () => {
  loadPayIns();

  // Show only the Pay In section
  document.getElementById("pay-in-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none"; // Hide the Dashboard
  document.getElementById("consultant-section").style.display = "none"; // Hide the Consultant

  // Update headers
  document.getElementById("pay-in-header").style.display = "block";
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("pay-in-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
});

// Event listener for "My Ledger" menu item
document.getElementById("ledger-menu").addEventListener("click", () => {
  loadLedger();

  // Show only the Ledger section
  document.getElementById("ledger-section").style.display = "block";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("consultant-section").style.display = "none";

  // Update headers
  document.getElementById("ledger-header").style.display = "block";
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";
  document.getElementById("consultant-header").style.display = "none";

  // Set active menu
  document.getElementById("ledger-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
  document.getElementById("consultant-menu").classList.remove("active");
  document.getElementById("dashboard-menu").classList.remove("active");
});

// Event listener for "Consultants" menu item
document.getElementById("consultant-menu").addEventListener("click", () => {
  loadConsultants();

  // Show only the Consultant section
  document.getElementById("consultant-section").style.display = "block";
  document.getElementById("ledger-section").style.display = "none";
  document.getElementById("payout-section").style.display = "none";
  document.getElementById("working-days-section").style.display = "none";
  document.getElementById("holidays-section").style.display = "none";
  document.getElementById("pay-in-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "none"; // Hide the Dashboard

  // Update headers
  document.getElementById("consultant-header").style.display = "block";
  document.getElementById("payout-header").style.display = "none";
  document.getElementById("working-days-header").style.display = "none";
  document.getElementById("holidays-header").style.display = "none";
  document.getElementById("pay-in-header").style.display = "none";

  // Set active menu
  document.getElementById("consultant-menu").classList.add("active");
  document.getElementById("payout-menu").classList.remove("active");
  document.getElementById("working-days-menu").classList.remove("active");
  document.getElementById("holidays-menu").classList.remove("active");
  document.getElementById("pay-in-menu").classList.remove("active");
});

// Load consultants data by default on page load
document.addEventListener("DOMContentLoaded", () => {
  loadConsultants();

  // Set initial active menu
  document.getElementById("consultant-menu").classList.add("active");
});
