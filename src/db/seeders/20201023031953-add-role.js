'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const transaction = await queryInterface.sequelize.transaction();
   try{

    await queryInterface.bulkInsert('role', [
      {
        role_no:'1',
        role_name:'admin'
      },
      {
        role_no:'2',
        role_name:'user'
      }
    ], {transaction});

     await transaction.commit();
   }catch(err){
     await transaction.rollback();
     throw err;
   }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.bulkDelete('role', null, {});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
