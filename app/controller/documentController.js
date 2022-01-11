require("dotenv").config();
const pdfParse = require("pdf-parse");
const db = require("../../models/index");
const Document = db.Documents;

exports.extract = (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.file).then(result => {
    res.send(result.text);
  });
};

exports.addDoc = (req, res) => {
  Document.create({
    title: req.body.title,
    year: req.body.year,
    faculty: req.body.faculty,
    tags: req.body.tags,
    text: req.body.text,
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

exports.findAll = (req, res) => {
  const { page, size } = req.query;

  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = 0 + (page ? page - 1 : 0) * limit;
  
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: documents } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, documents, totalPages, currentPage };
  };

  const { limit, offset } = getPagination(page, size);
  const order = [
    ['createdAt', 'DESC']
  ];

  Document.findAndCountAll({ limit, offset, order })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving documents."
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params
  Document.destroy({
    where: {id: id},
  }).then(() => {
      res
        .status(200)
        .json({ status: 200, message: "Document deleted successfully!" });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Error -> " + err });
    });
};