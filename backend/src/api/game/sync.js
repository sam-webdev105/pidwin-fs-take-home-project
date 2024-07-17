import User from "../models/user.js";
import History from "../models/history.js";

const sync = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Invalid User" });
    }

    // get the latest 10 coin toss history
    const history = []
    try {
      const result = await History.find({ email })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      history.push(...result)
    } catch { }

    // return history and current account of user's token
    res.status(200).json({
      crypto_token: existingUser.crypto_token,
      history,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default sync;