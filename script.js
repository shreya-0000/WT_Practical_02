let bookings = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        movie: "Avengers",
        date: "2026-09-25",
        time: "7:00 PM",
        tickets: 2,
        payment: "UPI",
        total: 400
    }
];


const bookingForm = document.getElementById("bookingForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const movieInput = document.getElementById("movie");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const ticketsInput = document.getElementById("tickets");
const paymentInput = document.getElementById("payment");

const bookingList = document.getElementById("bookingList");


function validateForm() {

    let valid = true;

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });


    if (nameInput.value.trim() === "") {

        document.getElementById("nameError").textContent =
            "Name is required.";

        valid = false;

    } else if (nameInput.value.trim().length < 3) {

        document.getElementById("nameError").textContent =
            "Name must contain at least 3 characters.";

        valid = false;
    }


    if (emailInput.value.trim() === "") {

        document.getElementById("emailError").textContent =
            "Email is required.";

        valid = false;

    } else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {

            document.getElementById("emailError").textContent =
                "Enter a valid email address.";

            valid = false;
        }
    }


    if (phoneInput.value.trim() === "") {

        document.getElementById("phoneError").textContent =
            "Phone number is required.";

        valid = false;

    } else {

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phoneInput.value.trim())) {

            document.getElementById("phoneError").textContent =
                "Enter a valid 10 digit phone number.";

            valid = false;
        }
    }


    if (movieInput.value === "") {

        document.getElementById("movieError").textContent =
            "Please select a movie.";

        valid = false;
    }


    if (dateInput.value === "") {

        document.getElementById("dateError").textContent =
            "Please select a booking date.";

        valid = false;

    } else {

        const selectedDate =
            new Date(dateInput.value);

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            document.getElementById("dateError").textContent =
                "Booking date cannot be in the past.";

            valid = false;
        }
    }


    if (timeInput.value === "") {

        document.getElementById("timeError").textContent =
            "Please select a show time.";

        valid = false;
    }


    if (ticketsInput.value === "") {

        document.getElementById("ticketsError").textContent =
            "Number of tickets is required.";

        valid = false;

    } else {

        const tickets =
            Number(ticketsInput.value);

        if (tickets < 1 || tickets > 10) {

            document.getElementById("ticketsError").textContent =
                "Tickets must be between 1 and 10.";

            valid = false;
        }
    }


    if (paymentInput.value === "") {

        document.getElementById("paymentError").textContent =
            "Please select a payment method.";

        valid = false;
    }


    return valid;
}


bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (!validateForm()) {
        return;
    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const movie =
        movieInput.value;

    const date =
        dateInput.value;

    const time =
        timeInput.value;

    const tickets =
        Number(ticketsInput.value);

    const payment =
        paymentInput.value;


    const duplicateBooking =
        bookings.some(function(booking) {

            return (
                booking.email.toLowerCase() ===
                email.toLowerCase() &&

                booking.movie === movie &&

                booking.date === date &&

                booking.time === time
            );

        });


    if (duplicateBooking) {

        document.getElementById("emailError").textContent =
            "You already have a booking for this movie show.";

        return;
    }


    const newBooking = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        movie: movie,

        date: date,

        time: time,

        tickets: tickets,

        payment: payment,

        total: tickets * 200
    };


    bookings.push(newBooking);


    bookingForm.reset();


    displayBookings();

});


function displayBookings() {

    bookingList.innerHTML = "";


    if (bookings.length === 0) {

        document.getElementById("noBookings").style.display =
            "block";

        return;
    }


    document.getElementById("noBookings").style.display =
        "none";


    bookings.forEach(function(booking) {

        const card =
            document.createElement("div");

        card.className = "booking-card";


        card.innerHTML = `

            <h3>${booking.movie}</h3>

            <p>
                <strong>Name:</strong>
                ${booking.name}
            </p>

            <p>
                <strong>Email:</strong>
                ${booking.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${booking.phone}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date}
            </p>

            <p>
                <strong>Show Time:</strong>
                ${booking.time}
            </p>

            <p>
                <strong>Tickets:</strong>
                ${booking.tickets}
            </p>

            <p>
                <strong>Payment:</strong>
                ${booking.payment}
            </p>

            <p class="total">
                Total Amount: ₹${booking.total}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelBooking(${booking.id})"
            >
                Cancel Booking
            </button>

        `;


        bookingList.appendChild(card);

    });

}


function cancelBooking(id) {

    const confirmation =
        confirm("Are you sure you want to cancel this booking?");


    if (!confirmation) {
        return;
    }


    bookings =
        bookings.filter(function(booking) {

            return booking.id !== id;

        });


    displayBookings();

}


displayBookings();
