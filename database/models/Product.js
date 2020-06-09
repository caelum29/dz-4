const {modelNamesEnum: {PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => sequelize.define(PRODUCT, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discountPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'product',
    timestamps: false,
});

