const { Thought, User } = require("../models");

const thoughtControllers = {
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const singleThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!singleThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(singleThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const userThought = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: userThought._id } },
        { new: true }
      );
      if (!userData) {
        return res
          .status(404)
          .json({ message: "thought created, but no user with that ID" });
      }
      res.json("thought succesfully created");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      const userData = await User.findOneAndUpdate(
        { username: thoughtData.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json("Thought deleted succesfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!reactionData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(reactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!reactionData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(reactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtControllers;
