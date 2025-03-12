const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Equipment = sequelize.define('equipment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    repair_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    equipment_add: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
}, {
    tableName: 'equipment'
});

module.exports = Equipment;