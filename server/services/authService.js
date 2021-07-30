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

// const getUserById = async (id) => {
//     let data = await User.findOne({ _id: id }).populate({ path: 'posts', select: 'imageUrl' }).select('username fullName email followers following posts bio profileImage').lean();
//     console.log(data);
//     return data;
// };

// const getUserData = async (data) => {
//     const { _id, user } = data;
//     if (_id !== user._id) throw { error: { message: 'Cannot perform this action' } };

//     let resa = await User.findOne({ _id }).select('email fullName username bio').lean();
//     return resa;
// };

// const getUserSavedPosts = async (id) => {
//     let data = await User.findOne({ _id: id }).populate({ path: 'savedPosts', select: 'imageUrl' }).select('savedPosts').lean();
//     console.log(data);
//     return data;
// };

// const getUsers = async () => {
//     let data = await User.find().lean();
//     console.log(data);
//     return data;
// };

// const followUser = async (users) => {
//     const { userId, followedUserId } = users;

//     let user = await User.findOne({ _id: userId });
//     let followedUser = await User.findOne({ _id: followedUserId });

//     let isFollowed = followedUser.followers.some(x => x == userId);
//     if (isFollowed) {
//         followedUser.followers.remove(user);
//         user.following.remove(followedUser);
//         await followedUser.save();
//         return await user.save();
//     }

//     followedUser.followers.push(user);
//     user.following.push(followedUser);

//     await followedUser.save();
//     return await user.save();
// };

// const deleteUser = async (data) => {
//     const { _id, user } = data;
//     if (_id !== user._id) throw { error: { message: 'Cannot perform this action' } };

//     let dbuser = await User.findOne({ _id });

//     return await User.deleteOne(dbuser);
// };

// const editUser = async (incData) => {
//     const { _id, user, data } = incData;
//     if (_id !== user._id) throw { error: { message: 'Cannot perform this action' } };

//     let dbuser = await User.findOneAndUpdate({ _id }, { ...data.data });
//     return await dbuser.save();
// };

// const getUserByUsername = async (data) => {
//     const { query } = data
//     let result = await User.find({ "username": { "$regex": `${query}`, "$options": "i" } }).select('username profileImage');
//     return result;
// };

module.exports = {
  register,
  login,
  // getUserData,
  // editUser,
  // getUserByUsername,
  // getUserById,
  // getUsers,
  // followUser,
  // deleteUser,
  // getUserSavedPosts,
};
