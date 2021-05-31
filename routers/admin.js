const express = require('express')
const Member = require('../models/member')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')
const { sendInvitationEmail, sendUpdationEmail, sendDeletionEmail } = require('../emails/account')
const router = new express.Router()


// Adding a new member
router.post('/members', auth, async (req, res) => {
    const member = new Member({
        ...req.body,
        owner: req.admin._id
    })

    try {

        //  Send Invitation Email for creating new member.
        sendInvitationEmail(user.email, user.name)
        
        await member.save()
        res.status(200).send(member)
    } catch (e) {
        res.status(400).send(e)
    }
})

//  Fetching a member according to current status
// 1. Pending Invitations
router.get('/members/pending', auth, async (req, res) => {

    try {
        const members = await Member.find({
            invitations: 0
        })
        res.status(200).send(members)

    } catch (e) {
        res.status(500).send()
    }
})

// 2. Accepted Invitations
router.get('/members/accepted',  auth, async (req, res) => {

    try {
        const members = await Member.find({
            invitations: 1
        })
        res.status(200).send(members)

    } catch (e) {
        res.status(500).send()
    }
})

// 3. Declined Invitations
router.get('/members/declined', auth, async (req, res) => {

    try {
        const members = await Member.find({
            invitations: 2
        })
        res.status(200).send(members)

    } catch (e) {
        res.status(500).send()
    }
})

//  Updating a member.
router.patch('/members/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'mobile', 'date', 'roles']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const member = await Member.findOne({ _id: req.params.id, owner: req.admin._id })

        if (!member) {
            return res.status(404).send()
        }

        updates.forEach((update) => member[update] = req.body[update])
        await member.save()

        // Sending Updation Email.
        sendUpdationEmail(user.email, user.name)
        res.send(member)
    } catch (e) {
        res.status(400).send(e)
    }
})

//  Deleting a member.
router.delete('/members/:id', auth, async (req, res) => {
    try {
        const member = await Member.findOneAndDelete({ _id: req.params.id, owner: req.admin._id })

        if (!member) {
            res.status(404).send()
        }

        // Sending Deletion Email.

        sendDeletionEmail(req.user.email, req.user.name)

        res.send(member)
    } catch (e) {
        res.status(500).send()
    }
})

// Routes for creating multiple admins
router.post('/admins', async (req, res) => {
    const admin = new Admin(req.body)

    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login API for an Admin
router.post('/admins/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (e) {
        res.status(400).send()
    }
})

// Logout API for an Admin
router.post('/admins/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// API for Logging out All the Admins
router.post('/admins/logoutAll', auth, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router