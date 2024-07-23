const { Server } = require("socket.io");
const app = require("../app");
const http = require("http");
const User = require("../models/user.model");
const { ResourceNotFoundError, BadRequestError } = require("../cores/errorResponse");
const Conversation = require("../models/conversation.model");
const { default: mongoose } = require("mongoose");
const Carrier = require("../models/carrier.model");
const Message = require("../models/message.model");
const { findUserById, verifyJwt, getConversations } = require("../utils");
const Key = require("../models/key.model");

const server = http.createServer(app);

const io = new Server(server, {
    cors: "http://localhost:5173",
    credentials: true
});

const onlineUsers = new Set();

io.on("connection", async (socket) => {
    const { token, id } = socket.handshake.auth;

    const foundKeyStore = await Key.findOne({ userId: id });
    if (!foundKeyStore) {
        throw new BadRequestError("Vui lòng đăng nhập lại để thực hiện hành động này");
    }
    const publicKey = foundKeyStore.publicKey;

    const user = verifyJwt(token, publicKey);

    socket.join(id);
    onlineUsers.add(id);
    io.emit("onlineUsers", Array.from(onlineUsers));

    socket.on("chatPage", async ({ currentUserId, receiverId }) => {
        try {
            if (receiverId) {
                let conversation = await Conversation.findOne({
                    participants: { $all: [currentUserId, receiverId] }
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [currentUserId, receiverId]
                    });
                }
            }

            const conversations = await getConversations(currentUserId)
            console.log(conversations)

            socket.emit("conversations", { allConversations: conversations });
        } catch (error) {
            console.error("Error loading conversations:", error);
            socket.emit("error", "Unable to load conversations");
        }
    });


    // Load conversations
    socket.on("loadConversations", async (userId) => {
        try {
            const allConversations = await getConversations(userId);
            socket.emit("conversations", { allConversations });
        } catch (error) {
            console.error("Error loading conversations:", error);
            socket.emit("error", "Unable to load conversations");
        }
    });

    socket.on("loadMessages", async ({ conversationId, senderId }) => {
        try {
            const allMessages = await Message.find({ conversationId }).lean();
            io.to(senderId).emit("getMessages", allMessages);
        } catch (error) {
            console.error("Error loading messages:", error);
            socket.emit("error", "Unable to load messages");
        }
    });

    // Send message
    socket.on("sendMessage", async ({ conversationId, senderId, text, receiverId }) => {
        try {
            let model
            const foundUser = await User.findOne({ _id: senderId })
            if (foundUser) {
                model = "Users"
            } else {
                model = "Carriers"
            }
            // const conversation = await Conversation.findOne({ _id: conversationId })
            console.log("receiverid:::::::::", receiverId)
            const message = new Message({
                conversationId,
                senderId,
                text,
                senderModel: model
            });
            await message.save();

            const allMessages = await Message.find({ conversationId })
            const conversations = await getConversations(receiverId)

            io.to(senderId).emit("newMessage", allMessages);
            io.to(receiverId).emit("newMessage", allMessages);
            io.to(receiverId).emit("conversations", { allConversations: conversations });

        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", "Unable to send message");
        }
    });

    socket.on("seen", async ({ currentUserId, conversationId }) => {
        try {

            const updateMessages = await Message.updateMany({
                conversationId,
                senderId: { $ne: currentUserId },
                seen: false

            }, {
                seen: true
            }, { new: true })

            const conversations = await getConversations(currentUserId)
            socket.emit("conversations", { allConversations: conversations });

        } catch (error) {

        }
    })

    // Join conversation
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
    });

    // Disconnect
    socket.on("disconnect", () => {
        onlineUsers.delete(id);
        io.emit("onlineUsers", Array.from(onlineUsers));
        console.log(`User ${id} disconnected`);
    });
});

module.exports = server;
