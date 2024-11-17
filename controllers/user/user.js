const User = require("../../model/schema/User");
const { sendEmail } = require("../../utils/mail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User Registration
const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, password, email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ message: "User already exists" });
    } else {

      // Create a new user
      const user = new User({
        fullName,
        phoneNumber,
        password,
        email,
      });
      // Save the user to the database
      const response = await user.save();

      const userObj = { ...response._doc };

      const JWT_SECRET = process.env.JWT_SECRET_KEY;

      const payload = {
        _id: userObj._id,
        fullName: userObj.fullName,
        email: userObj.email,
      };

      const token = jwt.sign(payload, JWT_SECRET);

      delete userObj["password"];
      res
        .status(200)
        .json({
          user: userObj,
          token,
          message: "User registered successfully",
        });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const userObj = { ...user._doc };
    delete userObj["password"];
    res.status(200).json({ user: userObj, token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const user = await User.findById(req.params?.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const edit = async (req, res) => {
  try {
    let { fullName, email, phoneNumber } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
      phoneNumber,
    });

    res.status(200).json({
      status: true,
      message: "User updated",
    });
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

const changePassword = async (req, res) => {
  try {
    let { password } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      password,
    });

    res.status(200).json({
      status: true,
      message: "Password updated",
    });
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

const becomePartner = async (req, res) => {
  try {
    const { email, name, phoneNumber, services, cities } = req.body;

    await sendEmail({
      email,
      subject: "Become Partner Request | Xpertfirst",
      message: `<!DOCTYPE html>
  <html>
  <body>
      <p>Email: ${email}</p>
      <p>Name: ${name}</p>
      <p>Phone Number: ${phoneNumber}</p>
      <p>Services: <br/> ${services}</p>
      <p>Cities: <br/> ${cities}</p>
  </body>
</html>`,
    });

    res.status(200).json({
      status: true,
      message: "Email Sent",
    });
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

module.exports = {
  register,
  login,
  index,
  edit,
  changePassword,
  becomePartner,
};
