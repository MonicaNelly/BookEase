"use strict";

/* ==========================================================
   BookEase - script.js
   ========================================================== */

/* ---------- Settings (edit these) ---------- */

// Business hours used to limit the booking time picker.
const BUSINESS_HOURS = { open: "08:00", close: "17:00" };

// Days the business is closed. 0 = Sunday, 1 = Monday ... 6 = Saturday.
const CLOSED_DAYS = [0];

// Temporary storage key. Bookings are saved in the browser until
// the ASP.NET Core API and SQL Server database are connected.
const STORAGE_KEY = "bookease_bookings";

/* ---------- Services data (single source of truth) ----------
   Later this array will be replaced by a fetch() call to your API,
   returning rows from the Services table. Durations are placeholders. */
const SERVICES = [
    {
        id: "hair",
        name: "Hair Services",
        description: "Professional hair services including styling, cutting and treatments.",
        price: 150,
        duration: "about 45 minutes"
    },
    {
        id: "beauty",
        name: "Beauty Services",
        description: "Personal beauty services designed to help you look and feel your best.",
        price: 200,
        duration: "about 1 hour"
    },
    {
        id: "cleaning",
        name: "Cleaning Services",
        description: "Professional cleaning services for homes and offices.",
        price: 300,
        duration: "about 3 hours"
    },
    {
        id: "it-support",
        name: "IT Support",
        description: "Basic computer and technical support services for individuals and businesses.",
        price: 250,
        duration: "about 1 hour"
    }
];

/* ---------- Helpers ---------- */

function formatPrice(amount) {
    return "R" + amount;
}

function findService(id) {
    return SERVICES.find(function (service) {
        return service.id === id;
    });
}

// Today's date as YYYY-MM-DD in the user's local time zone.
function todayISO() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split("T")[0];
}

function currentTimeHHMM() {
    const now = new Date();
    return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
}

/* ---------- Home page: service cards ---------- */

function renderHomeServices(container) {
    container.innerHTML = SERVICES.map(function (service) {
        return `
            <div class="service-card">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
            </div>`;
    }).join("");
}

/* ---------- Services page: cards with price and booking link ---------- */

function renderServicesPage(container) {
    container.innerHTML = SERVICES.map(function (service) {
        return `
            <div class="service-card">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p class="service-price"><strong>From ${formatPrice(service.price)}</strong></p>
                <p class="service-meta">${service.duration}</p>
                <a class="btn" href="booking.html?service=${encodeURIComponent(service.id)}">Book ${service.name}</a>
            </div>`;
    }).join("");
}

/* ---------- Booking page ---------- */

function initBookingForm(form) {
    const serviceSelect = document.getElementById("service");
    const serviceInfo = document.getElementById("serviceInfo");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const confirmation = document.getElementById("bookingConfirmation");

    // Fill the dropdown from the services data
    SERVICES.forEach(function (service) {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = service.name + " (from " + formatPrice(service.price) + ")";
        serviceSelect.appendChild(option);
    });

    // Preselect when arriving from the services page: booking.html?service=hair
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && findService(requested)) {
        serviceSelect.value = requested;
    }

    function updateServiceInfo() {
        const service = findService(serviceSelect.value);
        serviceInfo.textContent = service
            ? "From " + formatPrice(service.price) + ", " + service.duration + "."
            : "";
    }
    updateServiceInfo();
    serviceSelect.addEventListener("change", updateServiceInfo);

    // Date and time limits
    dateInput.min = todayISO();
    timeInput.min = BUSINESS_HOURS.open;
    timeInput.max = BUSINESS_HOURS.close;

    // Checks the chosen date and time make sense. Returns true if valid.
    function validateSchedule() {
        dateInput.setCustomValidity("");
        timeInput.setCustomValidity("");

        if (dateInput.value) {
            const day = new Date(dateInput.value + "T00:00").getDay();
            if (CLOSED_DAYS.includes(day)) {
                dateInput.setCustomValidity("We are closed on this day. Please choose another date.");
            }
        }

        if (timeInput.value) {
            if (timeInput.value < BUSINESS_HOURS.open || timeInput.value > BUSINESS_HOURS.close) {
                timeInput.setCustomValidity(
                    "Please choose a time between " + BUSINESS_HOURS.open + " and " + BUSINESS_HOURS.close + "."
                );
            } else if (dateInput.value === todayISO() && timeInput.value <= currentTimeHHMM()) {
                timeInput.setCustomValidity("That time has already passed. Please choose a later time.");
            }
        }

        return dateInput.checkValidity() && timeInput.checkValidity();
    }

    dateInput.addEventListener("input", validateSchedule);
    timeInput.addEventListener("input", validateSchedule);

    // Shows a summary after the booking is saved
    function showConfirmation(booking) {
        const service = findService(booking.serviceId);

        confirmation.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Booking request received";
        confirmation.appendChild(heading);

        const list = document.createElement("dl");
        [
            ["Name", booking.name],
            ["Service", service.name],
            ["Date", booking.date],
            ["Time", booking.time],
            ["Status", booking.status]
        ].forEach(function (row) {
            const dt = document.createElement("dt");
            const dd = document.createElement("dd");
            dt.textContent = row[0];
            dd.textContent = row[1];
            list.appendChild(dt);
            list.appendChild(dd);
        });
        confirmation.appendChild(list);

        const note = document.createElement("p");
        note.className = "form-hint";
        note.textContent = "We will contact you on " + booking.email + " to confirm your appointment.";
        confirmation.appendChild(note);

        confirmation.hidden = false;
        confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Temporary: save to the browser. Replace with fetch() to your API later.
    function saveBooking(booking) {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            saved.push(booking);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch (error) {
            console.error("Could not save booking:", error);
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateSchedule()) {
            form.reportValidity();
            return;
        }

        const booking = {
            name: form.elements["name"].value.trim(),
            email: form.elements["email"].value.trim(),
            phone: form.elements["phone"].value.trim(),
            serviceId: serviceSelect.value,
            date: dateInput.value,
            time: timeInput.value,
            message: form.elements["message"].value.trim(),
            status: "Pending",
            createdDate: new Date().toISOString()
        };

        saveBooking(booking);
        showConfirmation(booking);
        form.reset();
        updateServiceInfo();
    });
}

/* ---------- Start up: run only what the current page needs ---------- */

document.addEventListener("DOMContentLoaded", function () {
    const homeServices = document.getElementById("homeServices");
    if (homeServices) {
        renderHomeServices(homeServices);
    }

    const servicesList = document.getElementById("servicesList");
    if (servicesList) {
        renderServicesPage(servicesList);
    }

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        initBookingForm(bookingForm);
    }
});