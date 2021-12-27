require("dotenv").config();
var Sequelize = require('sequelize');
const db = require("../../models/index");
const SearchLogs = db.SearchLogs;
const Document = db.Documents;
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.js")[env];

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

exports.search = (req, res) => {
  const { keyword } = req.query;
  const containsQuery = [];

  if (keyword.indexOf(' ') >= 0) {
    const keywords = keyword.split(' ');
    containsQuery.push(...keywords.map(word => ({ 
      tags: { [db.Sequelize.Op.contains]: [{word}] } 
     })));
  } else {
    containsQuery.push({ 
      tags: { [db.Sequelize.Op.contains]: [{word: req.query.keyword}] } 
    });
  }

  Document.findAndCountAll({ 
    where: {
      [db.Sequelize.Op.or]: containsQuery
    }
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving search result."
      });
    });
};

exports.trending = async (req, res) => {
  sequelize.query('SELECT keyword, COUNT("id") AS "logCount" FROM "SearchLogs" AS "SearchLogs" GROUP BY "keyword" ORDER BY "logCount" DESC LIMIT 5', { type: sequelize.QueryTypes.SELECT})
    .then(data => {
      res.send(data);
    });
};

exports.summary = async (req, res) => {
  const countDoc = await sequelize.query('SELECT COUNT("id") AS "count" FROM "Documents" AS "Documents"', { type: sequelize.QueryTypes.SELECT})
  const countLog = await sequelize.query('SELECT COUNT("id") AS "count" FROM "SearchLogs" AS "SearchLogs"', { type: sequelize.QueryTypes.SELECT})
  const countUniqueLog = await sequelize.query('SELECT keyword, COUNT("id") AS "logCount" FROM "SearchLogs" AS "SearchLogs" GROUP BY "keyword"', { type: sequelize.QueryTypes.SELECT})
  
  const result = {
    countDoc,
    countLog,
    countUniqueLog: countUniqueLog.length
  }

  res.send(result);
};

exports.add = (req, res) => {
  SearchLogs.create({
    keyword: req.body.keywords,
  })
    .then((log) => {
      res
        .status(200)
        .json({ status: 200, message: "Logs created successfully!", log });
    })
    .catch((err) => {
      res.status(400).json({ status: 400, message: "Error -> " + err });
    });
};