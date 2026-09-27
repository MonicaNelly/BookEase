const bookNowButton = document.getElementById("bookNowButton");

if (bookNowButton) {
    bookNowButton.addEventListener("click", function () {
        window.location.href = "booking.html";
    });
}


const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Your booking has been submitted successfully!");

        bookingForm.reset();
    });
}
