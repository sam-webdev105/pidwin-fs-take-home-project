import { User, History } from "../../models/index.js";
import seedrandom from "seedrandom";

const play = async (req, res) => {
  const { email, wager_token, coin_side } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Invalid User" });
    }

    // validate user's token amount
    if (existingUser.crypto_token === 0) {
      return res.status(404).json({ message: "You Have 0 Token!" });
    }
    if (existingUser.crypto_token < wager_token) {
      return res.status(404).json({ message: "Not Enough Token" });
    }

    // subtract wager_token from the user
    existingUser.crypto_token = existingUser.crypto_token - wager_token
    await existingUser.save()

    // randomly decide the coin side
    const rValue = seedrandom(Date.now())()
    const server_coin_side = rValue >= 0.5 ? true : false
    const won = server_coin_side == coin_side

    // add 2x wager_token if the user is the winner
    if (won) {
      existingUser.crypto_token = existingUser.crypto_token + 2 * wager_token
      await existingUser.save()
    }

    // log history, calculating streak_count, multiple_count, fresh state
    const history = []
    try {
      const result = await History.find({ email })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      history.push(...result)
    } catch { }

    const streak_count = (won === true && history.length > 0 && history[0].won === true && history[0].fresh === false) ? history[0].streak_count + 1 : 1
    const multiple_count = streak_count === 3 ? 3 : (streak_count === 5 ? 10 : 1)

    History.create({
      email,
      wager_token,
      won,
      streak_count,
      multiple_count,
      fresh: streak_count === 5,
    })

    // bonus_payout
    const bonus_token = wager_token * (multiple_count - 1)
    existingUser.crypto_token = existingUser.crypto_token + bonus_token
    await existingUser.save()

    // return server coin result, user's WIN status
    res.status(200).json({ server_coin_side, won });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default play;