const axios = require("axios");
const base_url = "http://localhost:8000";

exports.ShowLogin = (req,res) => {
  res.render('login');
}

exports.login = async (req, res) => {
    try {
      const { username, password} = req.body;
     
      const response = await axios.post(`${base_url}/auth/login`, { username, password });

      
      if(response.data.user.deleted_at !== null) {
        return res.status(403).send("บัญชีนี้ถูกระงับการใช้งาน");
      }
      if (response.data.message === 'เข้าสู่ระบบสำเร็จ' ) {
        if (response.data.user.role === 'admin') {
          console.log('Welcome Admin')
          return res.redirect('/main');
        } else{
          return res.redirect('/auth/login');
        }
      } else {
        res.status(400).send("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.log("Can not found user")
      return res.redirect('/auth/login');
    }
  };
