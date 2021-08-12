const router = require("express").Router();
const companyService = require("../services/companyService");

const { auth } = require("../middlewares/auth");

router.post("/createCompany", auth, async (req, res, next) => {
  try {
    let result = await companyService.createCompany(req.body);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/createEvent", auth, async (req, res, next) => {
  try {
    let result = await companyService.createEvent(req.body);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.post("/editEvent/:id", auth, async (req, res, next) => {
  try {
    let result = await companyService.editEvent(req.params.id, req.body);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteEvent/:id", auth, async (req, res, next) => {
  try {
    let result = await companyService.deleteEvent(req.params.id, req.body);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/attendEvent/:id", auth, async (req, res, next) => {
  try {
    let result = await companyService.attendEvent(req.params.id, req.body);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/events", auth, async (req, res, next) => {
  try {
    let result = await companyService.getAllEvents();
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/event/:id", auth, async (req, res, next) => {
  try {
    let result = await companyService.getEventById(req.params.id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    let result = await companyService.getCompanyById(req.params.id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});


module.exports = router;
