const mongoose = require("mongoose");

const liturgySchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    phone: {
      type: String,
      required: [true, "Mobile phone number is required"],
    },

    noOfAttendees: {
      type: Number,
      required: [true, "This field is required"],
    },

    attendees: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Liturgy", liturgySchema);
