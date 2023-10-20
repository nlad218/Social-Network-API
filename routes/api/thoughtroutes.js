const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
  updateThought,
} = require("../../controllers/thoughtcontrollers");

router.route("/").get(getThought).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

router.route("/:thoughtId/reaction").post(addReaction);

module.exports = router;
