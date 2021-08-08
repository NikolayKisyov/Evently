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
    const { name, date, time, location, imageUrl, description, _id } = data;

    const user = await User.findOne({ _id });
    if (!user) throw { error: { message: "User not found" } };
    
    
    const company = await Company.findOne({ _id: user.companyId });
    if (!company) throw { error: { message: "No such company" } };
    
    console.log(company);
    const event = new Event({ name, date, time, location, description, imageUrl, companyId: company._id});
   
    company.events.push(event);
    await company.save();
    
    return await event.save();
};

const getAllEvents = async () => {
    let res = await Event.find().populate({path: 'companyId'}).lean(); 
    console.log(res);
    return res;
};

const getById = async (id) => {
    let company = await Company.findOne({ _id: id });
    

    return company;
};

module.exports = {
    createCompany,
    createEvent,
    getAllEvents,
    getById,
};