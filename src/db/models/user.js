'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.role,{
        through: "user_role",
        foreignKey: "user_no",
        otherKey: "role_no"
      });
    }
  };
  user.init({
    user_no:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName:'user',
    timestamps: true
    // I want updatedAt to actually be called updateTimestamp
    //updatedAt: 'updateTimestamp'
  });
  return user;
};