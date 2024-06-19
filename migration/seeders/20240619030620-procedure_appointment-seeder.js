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
   await queryInterface.bulkInsert('procedure_appointment',[{
    appointment_id:19,
    precedure_id:8,
    seed:true
   },{
    appointment_id:22,
    precedure_id:8,
    seed:true
   },{
    appointment_id:21,
    precedure_id:7,
    seed:true
   },{
    appointment_id:23,
    precedure_id:7,
    seed:true
   }],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('procedure_appointment',{seed:true},{})
  }
};
