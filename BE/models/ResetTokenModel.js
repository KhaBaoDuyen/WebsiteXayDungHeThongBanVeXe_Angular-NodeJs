const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const ResetToken = sequelize.define('ResetToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'resettokens',
    timestamps: true
});

module.exports = ResetToken;
