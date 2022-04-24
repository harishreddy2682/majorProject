import jwt from "jsonwebtoken";
import WhiteList from "../models/whitelistModel.js";

const auth = async (req, res, next) => {
    try {
        const { refreshtoken, accesstoken } = req.cookies
        if (!refreshtoken)
            // IF NO REFRESH TOKEN COOKIE FOUND
            return res.status(440).json({ msg: "Please login." })

        if (!accesstoken) {
            // IF ACCESS TOKEN EXPIRED
            const isInWhitelist = await WhiteList.findOne({ refreshToken: refreshtoken })
            if (!isInWhitelist) {
                return res.status(401).json({ msg: "Please Login." })
            }
            jwt.verify(refreshtoken, 'secret', async (err, data) => {
                if (!err) {
                    const newAccessToken = jwt.sign({ id: data.id }, 'secret', { expiresIn: '5s' })
                    res.cookie('accesstoken', newAccessToken, { httpOnly: true, maxAge: 1000 * 5 })
                    const newRefreshToken = jwt.sign({ id: data.id }, 'secret', { expiresIn: '7d' })
                    res.cookie('refreshtoken', newRefreshToken, { httpOnly: true, maxAge: 7*24*60*60*1000 })
                    await WhiteList.findOneAndRemove({ refreshToken: refreshtoken })
                    await WhiteList.create({ refreshToken: newRefreshToken })

                    req.userId = data.id
                    req.refreshToken = newRefreshToken
                    return next()
                }
                throw new Error('Invalid refresh token.')
            })

        } else {
            // IF ACCESS TOKEN IS VALID
            jwt.verify(accesstoken, 'secret', (err, data) => {
                if (!err) {
                    req.refreshToken = refreshtoken
                    req.userId = data.id
                    return next()
                }
                throw new Error('Invalid access token.')
            })
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}


export default auth