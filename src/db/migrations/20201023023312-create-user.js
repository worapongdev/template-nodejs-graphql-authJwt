'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('user', {
        user_no:{
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_name:{
          type: Sequelize.STRING(400),
          allowNull: false,
        },
        email:{
          type: Sequelize.STRING,
        },
        password:{
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },{transaction});

      await queryInterface.addIndex(
        'user',
        ['user_name'],
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
      await queryInterface.dropTable('user',{transaction});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
