const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer"))
      return res.status(401).json({ msg: "No authorize to do this.." });
    const token = authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ msg: "No authorize to do this.." });
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user)
      return res.status(401).json({ msg: "No authorize to do this.." });
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Password did not match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ msg: "Register Succesfully.." });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(400).json({ msg: "Invalid username or password " });

    pwOK = await bcrypt.compare(password, user.password);
    if (!pwOK)
      return res.status(400).json({ msg: "Invalid username or password " });
    const payload = {
      id: user.id,
      email: user.email,
      username: user.name,
    };
    const token = jwt.sign(payload, "SECRET_KEY", {
      expiresIn: 60 * 60 * 24 * 30,
    });
    res.json({
      msg: "Login Successful..",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
