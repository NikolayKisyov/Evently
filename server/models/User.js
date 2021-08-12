const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    eventsAttending: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ]
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
