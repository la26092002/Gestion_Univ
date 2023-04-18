const mongoose = require("mongoose");

const enseignantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    chefDepartement: {
      type: String,
      required: [true, "Please add a chefDepartement"],
    },
    id_departement: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Departement",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enseignant", enseignantSchema);
