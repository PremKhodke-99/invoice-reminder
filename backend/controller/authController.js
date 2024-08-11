const { oauth2client } = require("../utils/googleConfig");
const axios = require("axios");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image: picture });
    }
    const { _id } = user;
    console.log(_id, process.env.JWT_SECRET, process.env.JWT_TIMEOUT);

    const token = jwt.sign({ _id, email }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: process.env.JWT_TIMEOUT,
      }
  );

    console.log(7);

    return res.status(200).json({
      success: true,
      message: "success",
      token,
      user,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  googleLogin,
};
