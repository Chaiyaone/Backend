const { Sequelize } = require('sequelize');
const dbUrl = 'postgres://webadmin:IYOhba51267@node76611-jsproject.proen.app.ruk-com.cloud:5432/ReportIssue';
const sequelize = new Sequelize(dbUrl);
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;