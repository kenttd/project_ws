import pg from "pg";
const { Sequelize } = require("sequelize");
require("dotenv").config();
const uri = `postgres://${process.env.SUPABASE_USER}:${process.env.SUPABASE_PASSWORD}@${process.env.SUPABASE_HOST}:${process.env.SUPABASE_PORT}/${process.env.SUPABASE_DB}`;
const sequelize = new Sequelize(uri, {
  dialectModule: pg,
});

module.exports = sequelize;
