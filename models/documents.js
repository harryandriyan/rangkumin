'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Documents', {
    title: DataTypes.STRING,
    faculty: DataTypes.STRING,
    year: DataTypes.INTEGER,
    tags: DataTypes.JSONB,
  }, {});

  return Document;
};