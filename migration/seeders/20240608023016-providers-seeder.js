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
   await queryInterface.bulkInsert('providers',[{
      hospital_id:2,
      name:"Alto Clef",
      email:"Clef@gmail.com",
      phone:"123",
      department:"Doctor"
   },
   {
      hospital_id:2,
      name:"Jack Bright",
      email:"Bright@gmail.com",
      phone:"456",
      department:"Research"
    },
    {
      hospital_id:2,
      name:"Benjamin Kondraki",
      email:"Kondraki@gmail.com",
      phone:"789",
      department:"Vaccine"
   },
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('providers',{
      name:{
        [Sequelize.Op.in]:["Alto Clef","Jack Bright","Benjamin Kondraki"]
      }
    },{})
  }
};
