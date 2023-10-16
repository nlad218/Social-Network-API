const { Schema, model, Types } = require("mongoose");
const { format_date } = require("../utils/helpers");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (ts) => format_date(ts),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false,
  }
);

module.exports = reactionSchema;
