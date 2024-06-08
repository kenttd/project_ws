'use strict';
const crypto = require("crypto")
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
   await queryInterface.bulkInsert('hospitals',[{
        name:"Brookhaven Hospital",
        address:"Carrol Street, Silent Hill",
        phone:"123",
        email:"Brookhaven@gmail.com",
        website:"google.com",
        api_key:crypto.randomUUID()
        // api_key_end_date:"",
        // tier:""
   },{
        name:"Alchemilla Hospital",
        address:"Crichton Street, Silent Hill",
        phone:"456",
        email:"Alchemilla@gmail.com",
        website:"google.com",
        api_key:crypto.randomUUID()
        // api_key_end_date:"",
        // tier:""
    },
    {
      name:"Cedar Grove Sanitarium",
      address:"Acadia Road and Midway Avenue, Silent Hill",
      phone:"789",
      email:"Cedar@gmail.com",
      website:"google.com",
      api_key:crypto.randomUUID()
      // api_key_end_date:"",
      // tier:""
    },
    {
      name:"Racoon General Hospital",
      address:"near Racoon Park, Racoon City",
      phone:"101",
      email:"Racoon@gmail.com",
      website:"google.com",
      api_key:crypto.randomUUID()
      // api_key_end_date:"",
      // tier:""
    },
    {
      name:"Spencer Memorial Hospital",
      address:"Willowbrook Lane, Racoon City",
      phone:"112",
      email:"Spencer@gmail.com",
      website:"google.com",
      api_key:crypto.randomUUID()
      // api_key_end_date:"",
      // tier:""
    }
  ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('hospitals',{
      name:{
        [Sequelize.Op.in]:["Brookhaven Hospital","Alchemilla Hospital","Cedar Grove Sanitarium","Racoon General Hospital","Spencer Memorial Hospital"]
      }
    },{})
  }
};
