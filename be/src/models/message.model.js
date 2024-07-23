const { default: mongoose } = require("mongoose");
const COLLECTION_NAME = "Message";
const DOCUMENT_NAME = "Messages";

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' },
        senderId: { type: String, refPath: 'senderModel' }, // ID của người gửi tin nhắn (có thể là khách hàng hoặc nhà xe)
        senderModel: { type: String, enum: ['Users', 'Carriers'] },
        text: String,
        seen: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const Message = mongoose.model(DOCUMENT_NAME, MessageSchema);

module.exports = Message;
