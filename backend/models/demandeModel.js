const mongoose = require("mongoose");

const demandeSchema = mongoose.Schema(
  {
    module: {
      type: String,
      required: [true, "Please add a name"],
    },
    id_enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Enseignant",
    },
    verifier: {
      type: Boolean,
      required: [true, "Please add a verifier"],
    },
    confirmer: {
        type: Boolean,
        required: [true, "Please add a confirmer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Demande", demandeSchema);
