'use strict';
require("dotenv").config()
// const { TIME } = require('sequelize');
// const { now } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const now = new Date()
   await queryInterface.bulkInsert('access_log',[{
    access_time:new Date(now.getTime()+1000*1),
    api_key:process.env.APIKEYEXAMPLE2,
    endpoint:"get /api/providers",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*2),
    api_key:process.env.APIKEYEXAMPLE2,
    endpoint:"get /api/providers/2",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*3),
    api_key:process.env.APIKEYEXAMPLE2,
    endpoint:"post /api/providers",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*4),
    api_key:process.env.APIKEYEXAMPLE2,
    endpoint:"put /api/providers/5",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*5),
    api_key:process.env.APIKEYEXAMPLE2,
    endpoint:"delete /api/providers/5",
    seed:true
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('access_log',{
      seed:true
    },{})
  }
};
