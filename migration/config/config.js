require("dotenv").config

module.exports={
  "development": {
    "username": process.env.SUPABASE_USER,
    "password": process.env.SUPABASE_PASSWORD,
    "database": process.env.SUPABASE_DB,
    "host": process.env.SUPABASE_HOST,
    "port":process.env.SUPABASE_PORT,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.SUPABASE_USER,
    "password": process.env.SUPABASE_PASSWORD,
    "database": process.env.SUPABASE_DB,
    "host": process.env.SUPABASE_HOST,
    "port":process.env.SUPABASE_PORT,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.SUPABASE_USER,
    "password": process.env.SUPABASE_PASSWORD,
    "database": process.env.SUPABASE_DB,
    "host": process.env.SUPABASE_HOST,
    "port":process.env.SUPABASE_PORT,
    "dialect": "postgres"
  }
}
