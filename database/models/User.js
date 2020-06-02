module.exports = (sequelize, DataTypes) => sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type:  DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'user',
    timestamps: false,
});

