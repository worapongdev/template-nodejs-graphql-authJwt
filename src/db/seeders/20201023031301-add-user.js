'use strict';
import bcrypt from 'bcrypt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const transaction = await queryInterface.sequelize.transaction();
   try{

    await queryInterface.bulkInsert('user', [{
      user_name:'admin',
      email:'admin@example.com',
      password:bcrypt.hashSync('1234', 8),
      createdAt:new Date(),
      updatedAt:new Date()
    }], {transaction});

     await transaction.commit();
   }catch(err){
     await transaction.rollback();
     throw err;
   }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.bulkDelete('user', null, {});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
