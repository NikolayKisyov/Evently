const Company = require("../models/Company");
const User = require("../models/User");
const Event = require("../models/Event");

const createCompany = async (data) => {
  const { name, _id, address, description } = data;

  const user = await User.findOne({ _id });
  if (!user) throw { error: { message: "User not found" } };

  const company = new Company({
    name,
    address,
    description,
    ownerId: user._id,
  });

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

  const event = new Event({
    name,
    date,
    time,
    location,
    description,
    imageUrl,
    companyId: company._id,
  });

  company.events.push(event);
  await company.save();

  return await event.save();
};

const editEvent = async (eventId, data) => {
  const { name, date, time, location, description, userId } = data;

  const updateValues = { name, date, time, location, description };

  const user = await User.findOne({ _id: userId });
  if (!user) throw { error: { message: "User not found" } };

  const event = await Event.findOne({ _id: eventId })
    .populate({ path: "companyId" })
    .lean();

  let userIsOwner = event.companyId.ownerId.toString() == user._id.toString();

  if (!userIsOwner)
    throw { error: { message: "Unable to perform this action" } };

  let dbEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    { ...updateValues }
  );
  return await dbEvent.save();
};

const deleteEvent = async (eventId, data) => {
  const { userId } = data;
  const user = await User.findOne({ _id: userId });
  if (!user) throw { error: { message: "User not found" } };

  const event = await Event.findOne({ _id: eventId })
    .populate({ path: "companyId" })
    .lean();

  let userIsOwner = event.companyId.ownerId.toString() == user._id.toString();

  if (!userIsOwner)
    throw { error: { message: "Unable to perform this action" } };

  return await Event.deleteOne(event);
};

const attendEvent = async (eventId, data) => {
  const { userId } = data;

  const user = await User.findOne({ _id: userId });
  if (!user) throw { error: { message: "User not found" } };

  const event = await Event.findOne({ _id: eventId })
    .populate({ path: "companyId" });

  if (event == null)
    throw { error: { message: "No such event" } };

if(user.eventsAttending.includes(event._id)){
  event.attendees.remove(user);
  user.eventsAttending.remove(event); 
  await user.save();  
  return await event.save();
}

  event.attendees.push(user);
  user.eventsAttending.push(event);

  await user.save();  
  return await event.save();
};

const getAllEvents = async () => {
  let today = new Date();
  let res = await Event.find({ date: { $gte: today } })
    .populate({ path: "companyId" })
    .lean();
  console.log(res);
  return res;
};

const getEventById = async (id) => {
  let event = await Event.findOne({ _id: id }).lean();

  return event;
};

const getCompanyById = async (id) => {
  let company = await Company.findOne({ _id: id })
    .populate({ path: "ownerId" })
    .lean();

  return company;
};

module.exports = {
  createCompany,
  createEvent,
  getAllEvents,
  getEventById,
  getCompanyById,
  editEvent,
  deleteEvent,
  attendEvent
};
