const { Sequelize } = require("sequelize");
const pg = require("pg");
require("dotenv").config();
const uri = `postgres://${process.env.SUPABASE_USER}:${process.env.SUPABASE_PASSWORD}@${process.env.SUPABASE_HOST}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DB}`;
const sequelize = new Sequelize(uri, {
  dialectModule: pg,
});

module.exports = sequelize;
