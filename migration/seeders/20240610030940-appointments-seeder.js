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
   await queryInterface.bulkInsert('appointments',[{
      hospital_id:2,
      provider_id:2,
      patient_id:4,
      date:"09/06/2024",
      time:"09:18",
      status:"Upcoming",
      reason_for_visit:"Ice Cream Mukbang",
      notes:"1111 McDonald Ice Cream, 2000 Chocalte Ice Cream, 5000 Strawberry Ice Cream, 1230 Vanilla Ice Cream, 8800 Mocca Ice Cream"
   },{
      hospital_id:2,
      provider_id:2,
      patient_id:5,
      date:"09/06/2024",
      time:"10:22",
      status:"Upcoming",
      reason_for_visit:"McDonald Mukbang",
      notes:"10000 Beef Burgers, 10000 McFries, 20000 McNugget, 1000 McChicken, 99999 Cheese Burgers"
    },{
      hospital_id:2,
      provider_id:3,
      patient_id:6,
      date:"08/06/2024",
      time:"08:00",
      status:"Upcoming",
      reason_for_visit:"Mushroom Mukbang",
      notes:"9999 Fried Mushroom, 10000 Mushroom pizzas, 9999 Mushrooms Salmon"
    }
  ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('appointments',{
      reason_for_visit:{
        [Sequelize.Op.in]:["Ice Cream Mukbang","McDonald Mukbang","Mushroom Mukbang"]
      }
    },{})
  }
};
