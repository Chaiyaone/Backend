const axios = require("axios");
const base_url = "http://localhost:8000";

exports.getUserList = async (req, res) => {
  let page = parseInt(req.query.page) || 1; 
  let limit = 10; 
  try {
    const response = await axios.get(
      `${base_url}/users?page=${page}&limit=${limit}`
    );

    res.render("users/list", {
      users: response.data.user,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await axios.delete(base_url + "/users/" + req.params.id);
    res.redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

exports.showAddUserForm = (req, res) => {
  res.render("users/add");
};

exports.addUser = async (req,res) => {
  try{
    const data = {username : req.body.username , password : req.body.password , phone : req.body.phone, role : req.body.role};
    await axios.post(base_url + "/users", data);
    res.redirect("/users")
  }catch(err){
    res.status(500).send("Error")
  }
}

exports.showEditUserForm = async (req, res) => {
  try {
    const response = await axios.get(base_url + "/users/" + req.params.id);
    res.render("users/edit", { user: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

exports.editUser = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      role: req.body.role,
    };
    await axios.put(base_url + "/users/" + req.params.id, data);
    res.redirect("/users");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};


