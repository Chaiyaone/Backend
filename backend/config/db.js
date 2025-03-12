const { Sequelize } = require('sequelize');
// const dbUrl = 'postgres://webadmin:IYOhba51267@10.104.21.23:11620/ReportIssue';
 const dbUrl = 'postgres://webadmin:IYOhba51267@10.104.21.23:5432/ReportIssue';
const sequelize = new Sequelize(dbUrl);
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;