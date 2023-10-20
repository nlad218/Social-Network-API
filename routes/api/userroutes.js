const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} = require("../../controllers/usercontrollers");

router.route("/").get(getUser).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:userId/friend/:friendId").delete(removeFriend).post(addFriend);

module.exports = router;
