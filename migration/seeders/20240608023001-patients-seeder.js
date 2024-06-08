'use strict';

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
      await queryInterface.bulkInsert('patients',[{
        name:"Joe Bidenn",
        email:"Joe@gmail.com",
        phone:"123",
        address:"White House, Washington DC",
        date_of_birth:"20 November 1942",
        gender:"male"
      },{
        name:"Ronald McDonalld",
        email:"Ronald@gmail.com",
        phone:"456",
        address:"Any McDDonald Restaurants",
        date_of_birth:"10 July 1936",
        gender:"male"
      },{
        name:"Ethan Winter",
        email:"Winter@gmail.com",
        phone:"789",
        address:"Maplewood Avenue, South Carolina",
        date_of_birth:"20 November 1981",
        gender:"male"
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('patients',{
      name:{
        [Sequelize.Op.in]:["Joe Bidenn","Ronald McDonalld","Ethan Winter"]
      }
    },{})
  }
};
