'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const transaction = await queryInterface.sequelize.transaction();
   try{

    await queryInterface.bulkInsert('user_role', [
      {
        user_no:'1',
        role_no:'1'
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
      await queryInterface.bulkDelete('user_role', null, {});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
