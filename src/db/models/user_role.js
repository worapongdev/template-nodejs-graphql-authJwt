'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_role.hasOne(models.user,{foreignKey:'user_no'});
      user_role.hasOne(models.role,{foreignKey:'role_no'})
    }
  };
  user_role.init({
    user_no:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    role_no:{
      type:DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName:'user_role',
    timestamps: false
    // I want updatedAt to actually be called updateTimestamp
    //updatedAt: 'updateTimestamp'
  });
  return user_role;
};