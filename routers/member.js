const express = require('express')
const Member = require('../models/member')
const router = new express.Router()

// If a member accepts the invitation then we hit this API
router.get('/members/accepting', async (req, res) => {

    try {
        const member = await Member.findOne({
            _id: req.params.id
        })
        member.invitations = 1;

        await member.save();

        res.send("Accepted")

    } catch (e) {
        res.status(500).send()
    }
})

// If a member declines the invitation then we hit this API
router.get('/members/declining', async (req, res) => {

    try {
        const member = await Member.findOne({
            _id: req.params.id
        })
        member.invitations = 2;
        
        await member.save();

        res.send("Declined")

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router