const asyncHandler = require("express-async-handler");

const Liturgy = require("../models/liturgyModel");

const bookLiturgy = asyncHandler(async (req, res) => {
  const { fullName, date, phone, noOfAttendees, attendees } = req.body;
  if (!fullName || !phone || !noOfAttendees) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  const bookingExists = await Liturgy.findOne({ phone });
  if (bookingExists) {
    res.status(400);
    throw new Error("This phone number already booked");
  }

  const newBooking = await Liturgy.create({
    fullName,
    date,
    phone,
    noOfAttendees,
    attendees,
  });
  if (newBooking) {
    res.status(201).send("Booking is successfull");
  } else {
    res.status(401);
    throw new Error(
      "Something is wrong, please check your details and try again"
    );
  }
});

module.exports = {
  bookLiturgy,
};
