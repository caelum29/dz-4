module.exports = (sequelize, DataTypes) => sequelize.define('Product', {
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

