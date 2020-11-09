const { Inmates, Validate } = require("../models/inmates");
const express = require("express");
const multer = require("multer");
const _ = require("lodash");
const fs = require("fs");
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1000000 }, // max file size 1MB = 1000000 bytes
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("only upload files with jpg, jpeg, png format."));
    }
    cb(undefined, true); // continue with upload
  },
});

router.get("/", async (req, res) => {
  const inmates = await Inmates.find().sort({ lastName: 1 }).select({
    firstName: 1,
    lastName: 1,
    offence: 1,
    filePath: 1,
    dateAdmitted: 1,
  });
  res.send(inmates);
});

router.get("/:id", async (req, res) => {
  const inmate = await Inmates.find({ _id: req.params.id })
    .sort({ createdAt: "desc" })
    .select({
      firstName: 1,
      lastName: 1,
      offence: 1,
      filePath: 1,
      dateAdmitted: 1,
    });

  if (!inmate) return res.status(404).status("Inmate ID does not exist");
  res.send(inmate);
});

router.post("/", upload.single("file"), async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let data = await Inmates.findOne({ filePath: req.file.path });
  if (data) return res.status(400).send("Inmate data has been registered.");

  const {
    firstName,
    middleName,
    lastName,
    sex,
    dateOfBirth,
    nationality,
    stateOfOrigin,
    religion,
    offence,
    judgement,
    address,
    dateAdmitted,
    nextOfKin,
    nextOfKinAddress,
  } = req.body;
  const { path, filename } = req.file;

  // const inmate = new Inmates({
  //   firstName,
  //   middleName,
  //   lastName,
  //   sex,
  //   dateOfBirth,
  //   nationality,
  //   stateOfOrigin,
  //   religion,
  //   offence,
  //   judgement,
  //   address,
  //   dateAdmitted,
  //   nextOfKin,
  //   nextOfKinAddress,
  //   filePath: fs.readFileSync(path),
  // });

  var newInmate = new Inmates();
  newInmate.firstName = firstName;
  newInmate.middleName = middleName;
  newInmate.lastName = lastName;
  newInmate.sex = sex;
  newInmate.dateOfBirth = dateOfBirth;
  newInmate.nationality = nationality;
  newInmate.stateOfOrigin = stateOfOrigin;
  newInmate.religion = religion;
  newInmate.offence = offence;
  newInmate.judgement = judgement;
  newInmate.address = address;
  newInmate.dateAdmitted = dateAdmitted;
  newInmate.nextOfKin = nextOfKin;
  newInmate.nextOfKinAddress = nextOfKinAddress;
  newInmate.filePath.data = fs.readFileSync(req.file.path);
  newInmate.filePath.contentType = "image/jpeg";

  await newInmate.save();
  res.send(_.pick(newInmate, ["firstName", "lastName"]));
});

module.exports = router;
