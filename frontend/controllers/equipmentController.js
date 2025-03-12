const axios = require("axios");
const base_url = "http://localhost:8000";


exports.getEquipmentList = async (req, res) => {
  let page = parseInt(req.query.page) || 1; 
  let limit = 10; 

  try {
    const response = await axios.get(
      `${base_url}/equipment?page=${page}&limit=${limit}`
    );
    res.render("equipments/list", {
      equipment: response.data.equipment,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};


exports.deleteEquipment = async (req, res) => {
  try {
    await axios.delete(base_url + "/equipment/" + req.params.id);
    res.redirect("/equipments");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};


exports.showAddEquipmentForm = (req, res) => {
  res.render("equipments/add");
};


exports.addEquipment = async (req, res) => {
  try {
    const data = {
      equipment_name: req.body.equipment_name,
      equipment_type: req.body.equipment_type,
    };
    await axios.post(base_url + "/equipment", data);
    res.redirect("/equipments");
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.showEditEquipmentForm = async (req, res) => {
  try {
    const response = await axios.get(base_url + "/equipment/" + req.params.id);
    res.render("equipments/edit", { equipment: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};


exports.editEquipment = async (req, res) => {
  try {
    const data = {
      equipment_name: req.body.equipment_name,
      equipment_type: req.body.equipment_type,
    };
    await axios.put(base_url + "/equipment/" + req.params.id, data);
    res.redirect("/equipments");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};