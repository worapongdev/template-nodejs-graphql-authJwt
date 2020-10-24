'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable('user_role', {
        user_no:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'user'
            },
            key: 'user_no'
          }
        },
        role_no:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'role'
            },
            key: 'role_no'
          }
        },
      },{transaction});

      await queryInterface.addIndex(
        'user_role',
        ['user_no','role_no'],
        {transaction}
      );

      await queryInterface.addConstraint('user_role', {
        fields: ['user_no','role_no'],
        type: 'primary key',
        transaction
      });

      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.dropTable('user_role',{transaction});
      await transaction.commit();
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
