const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
    type: DataTypes.STRING,
    allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
    },

    lifeSpan: {
      type: DataTypes.STRING,
    },

    bred_for: {
      type: DataTypes.STRING,
    },
    
  }, { timestamps: false });
};
