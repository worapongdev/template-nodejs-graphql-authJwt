'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.belongsToMany(models.user,{
        through: "user_role",
        foreignKey: "role_no",
        otherKey: "user_no"
      });
    }
  };
  role.init({
    role_no:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    role_name: DataTypes.STRING
  }, {
    sequelize,
    tableName:'role',
    timestamps:false
    // I want updatedAt to actually be called updateTimestamp
    //updatedAt: 'updateTimestamp'
  });
  return role;
};