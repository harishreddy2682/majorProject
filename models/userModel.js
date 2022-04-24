import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    graduation: {
        year: { type: String, default: '' },
        course: { type: String, default: '' },
        institute: { type: String, default: '' },
        percentage: { type: String, default: '' }
    },
    highSchool: {
        year: { type: String, default: '' },
        institute: { type: String, default: '' },
        percentage: { type: String, default: '' }
    },
    intermediate: {
        year: { type: String, default: '' },
        institute: { type: String, default: '' },
        percentage: { type: String, default: '' }
    },
    experience: [
        {
            organization: { type: String, default: '' },
            description: { type: String, default: '' },
            startDate: { type: String, default: '' },
            endDate: { type: String, default: '' }
        }
    ],
    projects: [
        {
            title: { type: String, default: '' },
            description: { type: String, default: '' }
        }
    ],
    skills: {
        type: String,
        default: ''
    },
    achievements: [
        {
            type: String,
            default: ''
        }
    ],
    cources: [
        {
            type: String,
            default: ''
        }
    ],
    gitLink: {
        type: String,
        default: ''
    },
    linkedinLink: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('User', userSchema)

export default User