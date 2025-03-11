require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const app = express();
app.use(express.json());

const dbUrl =
  "postgres://webadmin:CECsml20839@node77045-dupepjs.proen.app.ruk-com.cloud:11605/ReportIssue"; //PG Database
const sequelize = new Sequelize(dbUrl);

// -------------------------- Table ------------------------------
const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

const Equipment = sequelize.define(
  "equipment",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    equipment_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    equipment_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    repair_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    equipment_add: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "equipment",
  }
);

const Issues = sequelize.define(
  "issues",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    equipment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Equipment,
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    technician_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "in_progress",
    },
    completed_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "issues",
    timestamps: false,
  }
);

Issues.belongsTo(Equipment, { foreignKey: "equipment_id", as: "Equipment" });
Issues.belongsTo(User, { foreignKey: "user_id", as: "User" });

const CompletedTasks = sequelize.define(
  "completed_tasks",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    equipment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Equipment,
        key: "id",
      },
    },
    issue_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Issues,
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Completed",
    },
    completed_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "completed_tasks",
    timestamps: false,
  }
);

CompletedTasks.belongsTo(Issues, { foreignKey: "issue_id", as: "Issue" });
CompletedTasks.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  as: "Equipment",
});
CompletedTasks.belongsTo(User, { foreignKey: "user_id", as: "User" });

sequelize.sync();

// login page
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, deleted_at: null } });

    if (!user || user.role !== "admin") {
      return res.status(400).json({ message: "ไม่มีสิทธิ์เข้า" });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }

    console.log("Login successful");
    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        deleted_at: user.deleted_at,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
});
// get All User
app.get("/users", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;
  try {
    const { count, rows: user } = await User.findAndCountAll({
      where: { deleted_at: null },
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });
    res.json({
      user,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/users/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
      deleted_at: null,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get("/users/user", async (req, res) => {
  try {
    const user = await User.findAll({
      where: { role: "user", deleted_at: null },
      attributes: ["id", "username"],
    });
    res.json(user);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
});
app.get("/users/technicians", async (req, res) => {
  try {
    const technicians = await User.findAll({
      where: { role: "technician", deleted_at: null },
      attributes: ["id", "username"],
    });
    res.json(technicians);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
});
app.post("/users", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.put("/user/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
      deleted_at: null,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        user
          .update(req.body)
          .then(() => {
            res.send(user);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/users/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        user
          .update({ deleted_at: new Date() })
          .then(() => {
            res.send({ message: "ปิดการใช้งานผู้ใช้สำเร็จ" });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}...`)
);
