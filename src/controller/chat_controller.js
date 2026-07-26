const { prisma } = require("../config/prisma_initialize");
const { getIO } = require("../config/socket");

// create converstation

const createConverstation = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { recipientId } = req.body;

    if (!recipientId) {
      return res.status(400).json({ error: "recipientId is required" });
    }

    if (currentUserId === recipientId) {
      return res
        .status(400)
        .json({ error: "you cannot start a converstation with you" });
    }

    // create converstation

    const newConverstation = await prisma.conversation.create({
      data: {
        users: { create: [{ userId: currentUserId }, { userId: recipientId }] },
      },
      include: {
        users: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });
    return res.status(201).json({
      message: "Conversation created successfully",
      conversation: newConverstation,
    });
  } catch (error) {
    console.log(`Enternel server error ${String(error)}`);
  }
};
const getConverstation = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`user Id is this ${String(userId)}`);

    const [findUser, userConversations] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      }),
      prisma.conversationUser.findMany({
        where: { userId: userId },
        include: {
          conversation: {
            include: {
              users: {
                include: {
                  user: {
                    select: { id: true, name: true, email: true },
                  },
                },
              },
              messages: {
                take: 1,
                orderBy: { createdAt: "desc" },
              },
            },
          },
        },
      }),
    ]);

    if (!findUser) {
      return res.status(404).json({ error: "User not found or unauthorized" });
    }

    return res.status(200).json({
      success: true,
      count: userConversations.length,
      conversations: userConversations.map((item) => item.conversation),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Internal server error: ${String(error)}` });
  }
};
// lets make send message route
const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user.id;

    const savedMessage = await prisma.message.create({
      data: {
        message: text,
        sender: {
          connect: { id: senderId },
        },
        conversation: {
          connect: { id: conversationId },
        },
      },
      include: {
        conversation: true,
      },
    });
    // Real-time send Message to Room with help of socket
    const io = getIO();

    io.to(conversationId).emit("receive_message", savedMessage);
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${String(error)}` });
  }
};
const getSPCmessageList = async (req, res) => {
  try {
    const usrID = req.user.id;

    // FIX 1: Destructure conversationId from params
    // Make sure your route definition looks like this: router.get("/messages/:conversationId", authorize, getSPCmessageList)
    const { conversationId } = req.params;

    const [findUser, getAllMessage] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { id: usrID },
      }),
      prisma.message.findMany({
        where: { conversationId: conversationId },
        // BONUS: Sort messages from oldest to newest so the chat flows correctly
        orderBy: { createdAt: "asc" },
      }),
    ]);

    if (!findUser) {
      return res.status(400).json({ error: "User not Found" });
    }

    // FIX 2 & FIX 3: Check array length, and use 404 for the status code number
    if (getAllMessage.length === 0) {
      return res.status(404).json({
        message: "There are no messages in this specific conversation",
      });
    }

    return res.status(200).json({
      status: "okk",
      data: getAllMessage, // I cleaned up the response structure slightly
    });
  } catch (error) {
    console.error(error);
    // Fixed the error string formatting
    return res
      .status(500)
      .json({ error: `Internal server Error: ${String(error)}` });
  }
};
module.exports = {
  createConverstation,
  getConverstation,
  sendMessage,
  getSPCmessageList,
};
