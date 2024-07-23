const { default: mongoose } = require("mongoose");
const Message = require("./message.model");
const COLLECTION_NAME = "Conversation";
const DOCUMENT_NAME = "Conversations";

const ConversationSchema = new mongoose.Schema(
    {
        participants: [
            { type: String, ref: 'Users' },
            { type: String, ref: 'Carriers' }],
        lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Messages' },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Conversation = mongoose.model(DOCUMENT_NAME, ConversationSchema);

module.exports = Conversation;
