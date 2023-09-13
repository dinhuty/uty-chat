const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

module.exports = async (email, data, type) => {

    try {

        const myOAuth2Client = new OAuth2Client(
            process.env.GOOGLE_MAILER_CLIENT_ID,
            process.env.GOOGLE_MAILER_CLIENT_SECRET
        )

        myOAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
        })

        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.ADMIN_EMAIL_ADDRESS,
                clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })

        const mailOptions = {
            from: process.env.ADMIN_EMAIL_ADDRESS,
            to: email,
            subject: `[DINHPRO] COMPANY`,
            html: `${data}`
        }
        await transport.sendMail(mailOptions)

        console.log({ success: "Send SUCCESS" })
    } catch (error) {
        console.log({ error: error })
    }
}
const LoginNotify = (data) => {
    return `
        Hi ${ data } !Bạn vừa đăng nhập vào hệ thống
            `
}