const mongoose = require("mongoose");
const User = require("./models/User");
const { syncUserStats } = require("./utils/activityEngine");
require("dotenv").config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mern-lms");
        const user = await User.findOne().sort({ updatedAt: -1 });
        if (user) {
            console.log("--- Syncing Latest User:", user.username || user.name, "---");
            await syncUserStats(user._id);
            
            const updatedUser = await User.findById(user._id);
            console.log("GitHub Username:", updatedUser.platforms.github.username);
            console.log("LeetCode Username:", updatedUser.platforms.leetcode.username);
            console.log("GitHub Stats:", JSON.stringify(updatedUser.platforms.github.stats, null, 2));
            console.log("LeetCode Stats:", JSON.stringify(updatedUser.platforms.leetcode.stats, null, 2));
        } else {
            console.log("No users found");
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
