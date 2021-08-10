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
// router.post('/:_id/like', async (req, res, next) => {
//     try {
//         let result = await postService.likePost(req.body);
//         console.log(result);
//         res.status(200).json({ result });
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

// router.post('/:_id/comments/:postId/like', async (req, res, next) => {
//     try {
//         let result = await postService.likeComment(req.body);
//         console.log(result);
//         res.status(200).json({ result });
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

// router.post('/:_id/save', async (req, res, next) => {
//     try {
//         let result = await postService.savePost(req.body);
//         console.log(result);
//         res.status(200).json({ result });
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

// router.post('/:_id/delete', auth, async (req, res, next) => {
//     try {
//         let id = req.params._id;
//         let user = req.user;
//         let result = await postService.deletePost({ id, user });
//         console.log(result);
//         res.status(200).json({ result });
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

// router.post('/comment', async (req, res, next) => {
//     try {
//         let result = await postService.addComment(req.body);
//         console.log(result);
//         res.status(200).json({ result });
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// });

module.exports = router;
