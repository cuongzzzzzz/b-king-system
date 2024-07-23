const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Carrier = require("../models/carrier.model");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const updateNestedObject = (obj) => {
  const final = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      Object.keys(obj[key]).forEach((k) => {
        final[`${key}.${k}`] = obj[key][k];
      });
      updateNestedObject(obj[key]);
    } else {
      final[key] = obj[key];
    }
  });
  return final;
};

const removeNullValueUpdate = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null || obj[key] == undefined) delete obj[key];
  });
  return obj;
};

function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

const verifyJwt = async (token, key) => {
  const verify = jwt.verify(token, key);
  if (!verify) throw new Erorr("you are not authenticated");
  return verify;
};

const createPairToken = ({ publicKey, privateKey, payload }) => {
  console.log(publicKey)
  const accessToken = jwt.sign(payload, publicKey, {
    expiresIn: "2 days",
  });
  const refreshToken = jwt.sign(payload, privateKey, {
    expiresIn: "7 days",
  });
  return { accessToken, refreshToken };
};

const findUserById = async (id) => {
  const foundUser = await User.findOne({ _id: id })
  if (foundUser) return foundUser

  const foundCarrier = await Carrier.findOne({ _id: id })

  if (foundCarrier) return foundCarrier

  return null
}

const getConversations = async (currentUserId) => {
  try {
    const allConversations = await Conversation.find({
      participants: { $in: [currentUserId] }
    }).populate('lastMessage').lean();

    for (let conv of allConversations) {
      const countUnseenMessages = await Message.countDocuments({
        conversationId: conv._id,
        senderId: { $ne: currentUserId },
        seen: false
      })
      conv.participants = await Promise.all(conv.participants.filter(id => id != currentUserId).map(async participantId => {
        let user = await User.findById(participantId).select('username email').lean();
        if (!user) {
          user = await Carrier.findById(participantId).select('name');
        } else {
          user.name = user.username;
          delete user.username;
        }
        conv.unSeenCount = countUnseenMessages
        return user;
      }));
    }
    console.log(allConversations)

    return allConversations;
  } catch (error) {
    console.error('Error loading conversations:', error);
    throw error;
  }
};


module.exports = {
  verifyJwt,
  removeNullValueUpdate,
  updateNestedObject,
  asyncHandler,
  createPairToken,
  findUserById,
  getConversations
};
