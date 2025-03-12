const axios = require("axios");
const base_url = "http://localhost:8000";

exports.getUser = async (req, res) => {
  let page = parseInt(req.query.page) || 1; 
  let limit = 10; 
  try {
    const response = await axios.get(
      `${base_url}/users?page=${page}&limit=${limit}`
    );
    res.render("general/user", {
      users: response.data.user,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.getEquipment = async (req, res) => {
  let page = parseInt(req.query.page) || 1; 
  let limit = 10; 

  try {
    const response = await axios.get(
      `${base_url}/equipment?page=${page}&limit=${limit}`
    );
    res.render("general/equipments", {
      equipment: response.data.equipment,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.getCompleted = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 10;
  try {
    const response = await axios.get(
      `${base_url}/completed?page=${page}&limit=${limit}`
    );
    //console.log(response.data.completed) debug

    res.render("general/completed", {
      completed: response.data.completed,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.getIssuesList = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 10;
  try {
    const response = await axios.get(
      `${base_url}/issue?page=${page}&limit=${limit}`
    );

    res.render("general/reportlist", {
      issues: response.data.issues,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};