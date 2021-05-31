const sgMail = require('@sendgrid/mail')

const key = 'xyz'  // set your key
sgMail.setApiKey(key)

const sendInvitationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ajay.tomar.chy16@itbhu.ac.in',
        subject: 'Invitation link for joining.',
        text: `Welcome to the company, ${name}. Click on the link and fill the details for creating your account.`
    })
}

const sendUpdationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ajay.tomar.chy16@itbhu.ac.in',
        subject: 'Account updated!',
        text: `Hey, ${name}. Your account has been updated!`
    })
}

const sendDeletionEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ajay.tomar.chy16@itbhu.ac.in',
        subject: 'Your account has been deleted!',
        text: `Goodbye, ${name}.`
    })
}

module.exports = {
    sendInvitationEmail,
    sendUpdationEmail,
    sendDeletionEmail
}
