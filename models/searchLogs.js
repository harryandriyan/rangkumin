'use strict';
module.exports = (sequelize, DataTypes) => {
  const SearchLogs = sequelize.define('SearchLogs', {
    keyword: DataTypes.TEXT
  }, {});

  return SearchLogs;
};