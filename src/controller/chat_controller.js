const { prisma } = require("../config/prisma_initialize");

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

    const findUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        conversations: {
          include: {
            conversation: {
              include: {
                users: { select: { id: true, name: true, email: true } },
              },
            },
          },
        },
      },
    });
    if (!findUser) {
      return res.status(400).send("user not found");
    }
    return res.status(200).json({
      user: { findUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Enternel server error : ${String(error)}`);
  }
};
module.exports = {
  createConverstation,
};
