const { google } = require('googleapis')
const { OAuth2 } = google.auth

// ID 和 SECRET
const oAuth2Client = new OAuth2('1086238500382-h5o060c5dl77q244fm2ajhr5rrf7ucp4.apps.googleusercontent.com', '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')

//refresh_token
oAuth2Client.setCredentials({
  refresh_token: '1//0er2OEMxyNVx1CgYIARAAGA4SNwF-L9Irt-r23Ebwdu2qrbUDn20Eolut-1mwQEsKjYZsDk7ThXktILS4e6Hugl4AcifCU85o4Tk',
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

module.exports = calendar
