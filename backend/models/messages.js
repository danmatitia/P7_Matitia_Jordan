'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Messages.belongsTo(models.user, {
        foreignKey: {
          name: "iduser",
          allowNull: false,
        },
      });
      models.Messages.hasMany(models.reponses, {
        foreignKey: {
          name: "idmessages",
          allowNull: false,
        },
      });
    }
  }
  Messages.init({
    iduser: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};