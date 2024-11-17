const User = require("../../model/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Address = require("../../model/schema/address");
const { sendEmail } = require("../../utils/resetEmail");

// User Registration
const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, formattedAddress, latlng, password, email } =
      req.body;
    const user = await User.findOne({ phoneNumber });

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

      const newAddress = new Address({
        latlng,
        formattedAddress,
        user: response._id,
      });
      await newAddress.save();

      const userObj = { ...response._doc };
      delete userObj["password"];
      res
        .status(200)
        .json({ user: userObj, message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    // Find the user by phoneNumber
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    // Compare the provided password with the hashed password stored in the database
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }
    // Create a JWT token
    // const token = jwt.sign({ userId: user._id }, "secret_key", {
    //   expiresIn: "1d",
    // });

    const userObj = { ...user._doc };
    delete userObj["password"];
    res.status(200).json({ user: userObj });
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
