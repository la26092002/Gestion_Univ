const mongoose = require("mongoose");

const departementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    idFaculte: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculte',
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Departement", departementSchema);