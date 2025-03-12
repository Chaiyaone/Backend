const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
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
};

exports.getUserById = (req, res) => {
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
};

exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.updateUser = (req, res) => {
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
};

exports.deleteUser = (req, res) => {
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
};

exports.getTechnicians = async (req, res) => {
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
};

exports.getUser = async (req,res) => {
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
}
