'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('role', {
        role_no:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        role_name:{
          type: Sequelize.STRING(400),
          allowNull: false,
        }
      },{transaction});

      await queryInterface.addIndex(
        'role',
        ['role_name'],
        {transaction}
      );

      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.dropTable('role',{transaction});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
