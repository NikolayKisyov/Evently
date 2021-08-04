const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, SECRET } = require("../config");
const User = require("../models/User");

const register = async (data) => {
 const { username, email, firstName, lastName, password} = data;  

  let usernameDb = await User.findOne({ username });
  if (usernameDb) throw { error: { message: "User already exists!" } };

  let userEmail = await User.findOne({ email });
  if (userEmail) throw { error: { message: "Email already taken!" } };

  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(password, salt);

  const user = new User({ username, email, firstName, lastName, password: hash });

  return await user.save();
};

const login = async (data) => {

  const { username, password } = data;
  let user = await User.findOne({ username });
  if (!user) throw { error: { message: "User not found" } };

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { error: { message: "Invalid username or password" } };

  let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);
  //let token = jwt.sign({ _id: user._id, email: user.email }, SECRET)
  
  let result = {
    user: {
      _id: user._id,
      username: user.username,
    },
    token,
  };

  return result;
};

const getUserById = async (id) => {
    let data = await User.findOne({ _id: id }).select('username firstName lastName email companyId').lean();
    console.log(data);
    return data;
};


module.exports = {
  register,
  login,
  getUserById,
};
