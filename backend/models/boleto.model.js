"use strict";
const { Schema, model } = require("mongoose");

const BoletoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    telefono: { type: Number, required: true },
    serie: { type: Number, required: true },
    direccion: { type: String, required: true },
    creadoEn: { type: Date, required: true, default: Date.now() },
    // profile: {
    //     type: Object,
    //     required: true,
    //     default: {
    //         url: "https://res.cloudinary.com/gigga/image/upload/v1633757380/mrstems/no-user_w9qnac.jpg",
    //         public_id: "mrstems/no-user_w9qnac",
    //     },
    // },
  },
  { collection: "boletos" }
);

BoletoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Boleto", BoletoSchema);
