const axios = require("axios");
const base_url = "http://localhost:8000";

exports.getCompleted = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 10;
  try {
    const response = await axios.get(
      `${base_url}/completed?page=${page}&limit=${limit}`
    );
    //console.log(response.data.completed) debug

    res.render("issue/completed", {
      completed: response.data.completed,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};