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
   await queryInterface.bulkInsert('procedures',[{
      hospital_id:2,
      name:"Mukbang",
      description:"Patients can eat whatever they want",
      duration:"1h",
      price:"0$"
   },
   {
      hospital_id:2,
      name:"BobaTeaMukbang",
      description:"Patients can drink whatever desert drink they want",
      duration:"1h",
      price:"1$"
  },
  {
      hospital_id:2,
      name:"IceMukbang",
      description:"Patients can eat whatever ice cream they want",
      duration:"1h",
      price:"2$"
  },
  ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('procedures',{
      name:{
        [Sequelize.Op.in]:["Mukbang","BobaTeaMukbang","IceMukbang"]
      }
    },{})
  }
};
