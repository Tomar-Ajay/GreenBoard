const mongoose = require('mongoose')
const validator = require('validator')

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    //  Current Team member, Pending Invitations, Declined Invitations
    // I have taken Pending Invitation = 0,  Accepted Invitation = 1, Declined Invitation = 2
    // I have set default value of Invitation as 0 which is pending.
    invitations: {
        type: Number,
        default: 0
    },
    roles: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        default: 0,
        validate(value) {
            var number = value
            if ((number.length != 10)||(number.value == "")) {
                throw new Error('Phone number must be 10 digits.')
            }
        }
    },
    date: {
        type: Number,
        default: 0,
        validate(value) {
            var date = value;
            var pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
            if (date == null || date == "" || !pattern.test(date)) {
                throw new Error('Invalid date of joining.')
            }
        }
    },
    //  User created by which Admin.
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    }
}, {
    timestamps: true
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member