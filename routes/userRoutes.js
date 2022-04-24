import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import auth from '../middleware/protect.js'

const router = express.Router()

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)

// PRIVATE ROUTES
router.post('/profile', auth, userCtrl.updateProfile)
router.get('/profile', auth, userCtrl.getProfileData)
router.get('/logout', auth, userCtrl.logout)
router.get('/', auth, userCtrl.getLoggedInUser)



export default router