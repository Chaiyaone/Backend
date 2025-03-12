const axios = require("axios");
const base_url = "http://localhost:8000";

exports.getIssuesList = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 10;
  try {
    const response = await axios.get(
      `${base_url}/issue?page=${page}&limit=${limit}`
    );

    res.render("issue/list", {
      issues: response.data.issues,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    await axios.delete(base_url + "/issue/" + req.params.id);
    res.redirect("/issue");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

exports.ShowReport = (req, res) => {
  res.render("issue/report");
};

exports.postIssues = async (req, res) => {
  try {
    console.log(req.body)
    const data = {
      equipment_id: req.body.equipment_id,
      user_id: req.body.user_id,
      technician_id : req.body.technician_id,
      description: req.body.description,
    };
    const response = await axios.post(base_url + "/issue", data);
    res.redirect("/issue/report");
  } catch (err) {
    res.redirect("/issue/report");
  }
};
