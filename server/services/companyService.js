const Company = require('../models/Company');
const User = require('../models/User');
const Event = require('../models/Event');

const createCompany = async (data) => {
    const { name, _id, address, description } = data;

    const user = await User.findOne({ _id });
    if (!user) throw { error: { message: "User not found" } };

    const company = new Company({ name, address, description, ownerId: user._id });
    
    user.companyId = company._id;
    await user.save();

    return await company.save();
};

const createEvent = async (data) => {
    const { name, date, time, location, description, _id } = data;

    const user = await User.findOne({ _id });
    if (!user) throw { error: { message: "User not found" } };
    
    
    const company = await Company.findOne({ _id: user.companyId });
    if (!company) throw { error: { message: "No such company" } };
    
    console.log(company);
    const event = new Event({ name, date, time, location, description, imageUrl: 'test', companyId: company._id});
   
    company.events.push(event);
    await company.save();
    
    return await event.save();
};

const getById = async (id) => {
    let company = await Company.findOne({ _id: id });
    

    return company;
};

const getAll = async (_id) => {
    
    let res = await User.findOne({ _id }).select('following').lean();
    let followers = res.following;
    let posts = await Post.find({ owner: { $in: followers } }).populate({ path: 'owner', select: 'username profileImage' }).populate({ path: 'comments', populate: { path: 'user' } }).lean();

    return posts;
};

module.exports = {
    createCompany,
    createEvent,
    getAll,
    getById,
};