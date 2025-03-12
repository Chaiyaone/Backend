const DataTypes = require('sequelize');
const sequelize = require('../config/db');
const Issues = require('./Issues');
const User = require('./User');
const Equipment = require('./Equipment');

const CompletedTasks = sequelize.define('completed_tasks', {
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
    issue_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Issues,
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Completed"
    },
    completed_at: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'completed_tasks', 
    timestamps: false
});

CompletedTasks.belongsTo(Issues, { foreignKey: 'issue_id', as: 'Issue' });
CompletedTasks.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'Equipment' });
CompletedTasks.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

module.exports = CompletedTasks;