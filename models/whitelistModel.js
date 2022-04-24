import mongoose from "mongoose";

const whitelistSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        trim: true
    }
})

const WhiteList = mongoose.model('WhiteList', whitelistSchema)

export default WhiteList