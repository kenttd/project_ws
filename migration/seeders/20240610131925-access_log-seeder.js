'use strict';

const { TIME } = require('sequelize');
const { now } = require('sequelize/lib/utils');

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
   await queryInterface.bulkInsert('access_log',[{
    access_time:new Date(now.getTime()+1000*1),
    api_key:"a31038de2e34de567a25aada6a7b67b6c7f972d5",
    endpoint:"get /api/providers",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*2),
    api_key:"a31038de2e34de567a25aada6a7b67b6c7f972d5",
    endpoint:"get /api/providers/2",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*3),
    api_key:"a31038de2e34de567a25aada6a7b67b6c7f972d5",
    endpoint:"post /api/providers",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*4),
    api_key:"a31038de2e34de567a25aada6a7b67b6c7f972d5",
    endpoint:"put /api/providers/5",
    seed:true
   },{
    access_time:new Date(now.getTime()+1000*5),
    api_key:"a31038de2e34de567a25aada6a7b67b6c7f972d5",
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