const Issues = require("../models/Issues");
const Equipment = require("../models/Equipment");
const User = require("../models/User");
const Completed = require("../models/Complete_task");

exports.getAllIssues = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  try {
    const { count, rows: issues } = await Issues.findAndCountAll({
      include: [
        {
          model: Equipment,
          as: "Equipment",
          attributes: ["equipment_name"],
        },
        {
          model: User,
          as: "User",
          attributes: ["username"],
        },
      ],
      where: { completed_at: null },
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
    });
    const formattedIssues = issues.map((issue) => ({
      id: issue.id,
      equipment_name: issue.Equipment?.equipment_name || "Guest",
      username: issue.User?.username || "Guest",
      description: issue.description,
      technician_name: issue.technician_name,
      created_at: issue.created_at,
      status: issue.status,
    }));
    res.json({
      issues: formattedIssues,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ message: "Error fetching issues" });
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issues.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await Completed.create({
      issue_id: issue.id,
      equipment_id: issue.equipment_id,
      user_id: issue.user_id,
      description: issue.description,
    });
    await issue.update({ completed_at: new Date(), status: "completed" });

    res.json({ message: "งานสำเร็จและบันทึกลง CompletedTasks แล้ว" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { user_id, equipment_id, technician_id, description } = req.body;

    if (!user_id || !equipment_id || !description) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    const user = await User.findOne({
      where: { id: user_id, deleted_at: null },
    });

    const eq = await Equipment.findOne({
      where: { id: equipment_id, deleted_at: null },
    });

    const technician = await User.findOne({
      where: { id: technician_id, role: "technician" },
      attributes: ["username"],
    });

    if (!user || !eq) {
      return res.status(400).json({ message: "ไม่พบ ผู้ใช้/อุปกรณ์ หมายเลขนี้" });
    }

    if (!technician) {
      return res.status(400).json({ message: "ไม่พบช่างหมายเลขนี้ หรือไม่มีสิทธิ์เป็น technician" });
    }


    const newIssue = await Issues.create({
      user_id,
      equipment_id,
      description,
      technician_name: technician.username,
    });

    // อัปเดตค่า repair_count ของอุปกรณ์
    eq.repair_count += 1;
    await eq.save();

    res.status(201).json(newIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
};

