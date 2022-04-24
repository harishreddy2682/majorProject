import User from "../models/userModel.js"
import WhiteList from "../models/whitelistModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new User({ name, email, password: passwordHash })

            await newUser.save()

            return res.status(200).json({ msg: 'Registered!' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Email is not registered." })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({ msg: "incorrect password." })

            const refreshToken = jwt.sign({ id: user._id }, 'secret', { expiresIn: '7d' })
            const accessToken = jwt.sign({ id: user._id }, 'secret', { expiresIn: '5s' })


            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 DAYS
            })

            res.cookie('accesstoken', accessToken, {
                httpOnly: true,
                maxAge: 1000 * 5        // 5s
            })

            const whitelist = await WhiteList.create({ refreshToken })

            return res.status(200).json({ msg: 'Logged in!' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { email, phone, graduation, intermediate, highSchool, experience, projects, skills, achievements, cources, gitLink, linkedin } = req.body
            const user = await User.findByIdAndUpdate(req.userId, {
                email, phone, graduation, intermediate, highSchool, experience, projects, skills, achievements, cources, gitLink, linkedinLink: linkedin
            })
            if(!user) {
                return res.status(400).json({ msg: 'User does not exist.' })
            }
            return res.status(200).json({ msg: 'protected route accessed!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getProfileData: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password')
            return res.status(200).json(user)
        } catch (error) {
            
        }
    },
    getLoggedInUser: async (req, res) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ msg: 'Not authorized!' })
            }
            const user = await User.findById(req.userId)
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist.' })
            }
            return res.status(200).json({ id: user._id, name: user.name, email: user.email })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            if (!req.userId) {
                return res.status(401).json({ msg: 'Not authorized!' })
            }

            await WhiteList.findOneAndRemove({ refreshToken: req.refreshToken })
            res.clearCookie('accesstoken')
            res.clearCookie('refreshtoken')
            return res.status(200).json({ msg: 'Logged out!' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default userCtrl