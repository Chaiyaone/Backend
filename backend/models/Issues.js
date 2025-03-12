const DataTypes = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Equipment = require('./Equipment');

const Issues = sequelize.define('issues', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipment,
            key: 'id' 
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    technician_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'in_progress'
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'issues',
    timestamps: false
});

Issues.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'Equipment' });
Issues.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

module.exports = Issues;
