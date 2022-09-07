const { google } = require('googleapis')
const { OAuth2 } = google.auth

// ID 和 SECRET
const oAuth2Client = new OAuth2('526215990556-gbgmt6b54f8qqu6g7p3i73fckqi7scsm.apps.googleusercontent.com', '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')

oAuth2Client.setCredentials({
  refresh_token: '1//0eynkwkDNRIRICgYIARAAGA4SNwF-L9IrWKHHvJzbPvyjPIkHfAEJOi1FccA1LAXAgroBVW_s7Txun6muDjShPtJoX7g2Ti_qzGs',
})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

module.exports = calendar
