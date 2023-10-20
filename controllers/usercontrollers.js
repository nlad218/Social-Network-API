const { Thought, User } = require("../models");

const userControllers = {
  async getUser(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId })
        .populate("friends")
        .populate("thoughts");
      if (!singleUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(singleUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json("User deleted succesfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friendData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(friendData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!friendData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(friendData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userControllers;
