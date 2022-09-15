const { google } = require('googleapis')
const { OAuth2 } = google.auth

// ID 和 SECRET
const oAuth2Client = new OAuth2('', '')

//refresh_token
oAuth2Client.setCredentials({
  refresh_token: '',
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

module.exports = calendar
