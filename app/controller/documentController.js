require("dotenv").config();
const pdfParse = require("pdf-parse");
const db = require("../../models/index");
const Document = db.Document;

exports.extract = (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.file).then(result => {
    res.send(result.text);
  });
};

exports.create = (req, res) => {
  Document.create({
    title: req.body.title,
    year: req.body.year,
    faculty: req.body.faculty,
    tags: req.body.tags,
  })
    .then((document) => {
      res
        .status(200)
        .json({ status: 200, message: "Document created successfully!", document });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Error -> " + err });
    });
};

exports.delete = (req, res) => {
  Document.destroy({
    id: req.body.id,
  }).then((document) => {
      res
        .status(200)
        .json({ status: 200, message: "Document deleted successfully!", document });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Error -> " + err });
    });
};