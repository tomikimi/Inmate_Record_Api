const Joi = require("joi");
const { join } = require("lodash");
const mongoose = require("mongoose");

const inmateSchema = new mongoose.Schema(
  {
    firstName: { type: String, minlength: 3, maxlength: 255, required: true },
    middleName: { type: String, minlength: 3, maxlength: 255, required: true },
    lastName: { type: String, minlength: 3, maxlength: 255, required: true },
    sex: { type: String, minlength: 4, maxlength: 10, required: true },
    dateOfBirth: { type: String, minlength: 5, maxlength: 255, required: true },
    nationality: { type: String, minlength: 5, maxlength: 255, required: true },
    stateOfOrigin: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    religion: { type: String, minlength: 5, maxlength: 255, required: true },
    offence: { type: String, minlength: 5, maxlength: 255, required: true },
    judgement: { type: String, minlength: 5, maxlength: 255, required: true },
    address: { type: String, minlength: 5, maxlength: 255, required: true },
    dateAdmitted: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    nextOfKin: { type: String, minlength: 5, maxlength: 255, required: true },
    nextOfKinAddress: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    filePath: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

const Inmate = mongoose.model("Inmates", inmateSchema);

function ValidateInmate(inmate) {
  const schema = {
    firstName: Joi.string().min(5).max(25).required(),
    middleName: Joi.string().min(5).max(25).required(),
    lastName: Joi.string().min(5).max(25).required(),
    sex: Joi.string().min(4).max(25).required(),
    dateOfBirth: Joi.string().min(5).max(25).required(),
    nationality: Joi.string().min(5).max(25).required(),
    stateOfOrigin: Joi.string().min(5).max(25).required(),
    religion: Joi.string().min(5).max(25).required(),
    offence: Joi.string().min(5).max(25).required(),
    judgement: Joi.string().min(5).max(25).required(),
    address: Joi.string().min(5).max(25).required(),
    dateAdmitted: Joi.string().min(5).max(25).required(),
    nextOfKin: Joi.string().min(5).max(25).required(),
    nextOfKinAddress: Joi.string().min(5).max(25).required(),
  };
  return Joi.validate(inmate, schema);
}

module.exports.Inmates = Inmate;
module.exports.Validate = ValidateInmate;
