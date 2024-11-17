const crypto = require("crypto");
// const bcrypt = require("bcrypt");
const User = require("../../model/schema/user");

const { sendEmail, mailTemplate } = require("../../utils/resetEmail");
const ResetToken = require("../../model/schema/resettoken");

// const NumSaltRounds = Number(process.env.NO_OF_SALT_ROUNDS);

const forgot = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.json({
        success: false,
        message: "Your are not registered!",
      });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      const resetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const newToken = new ResetToken({
        token: resetToken,
        user: user._id?.toString(),
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString(),
      });

      await newToken.save();

      const mailOption = {
        email: user.email,
        subject: "Forgot Password Link | Xpertfirst",
        message: mailTemplate(
          "We have received a request to reset your password. Please reset your password using the link below.",
          `${process.env.FRONTEND_URL}/resetPassword?id=${user._id?.toString()}&token=${resetToken}`,
          "Reset Password"
        ),
      };
      await sendEmail(mailOption);
      res.json({
        success: true,
        message: "A password reset link has been sent to your email.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const reset = async (req, res) => {
  try {
    const { password, token, userId } = req.body;
    const userToken = await ResetToken.find({ user: userId }).sort({createdAt: -1}).limit(1);
    if (!res || res.length === 0) {
      res.json({
        success: false,
        message: "Some problem occurred!",
      });
    } else {
      const currDateTime = new Date();
      const expiresAt = new Date(userToken[0]?.expiresAt);
      if (currDateTime > expiresAt) {
        res.json({
          success: false,
          message: "Reset Password link has expired!",
        });
      } else if (userToken[0]?.token !== token) {
        res.json({
          success: false,
          message: "Reset Password link is invalid!",
        });
      } else {
        await ResetToken.deleteMany({ user: userId });
        // const salt = await bcrypt.genSalt(NumSaltRounds);
        await User.findByIdAndUpdate(userId, {
          password,
        });
        res.json({
          success: true,
          message: "Reset password done! You can log in with new credentials!",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { forgot, reset };
