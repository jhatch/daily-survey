const { GoogleMail } = require('google-clients');
const credentials = require('./credentials.json');

const oauth = {
  client_id: process.env.client_id || credentials.oauth.client_id,
  client_secret: process.env.client_secret || credentials.oauth.client_secret,
  redirect_uris: process.env.redirect_uris || credentials.oauth.redirect_uris,
};

const gmailToken = {
  access_token: process.env.gmail_access_token || credentials.gmail.token.access_token,
  refresh_token: process.env.gmail_refresh_token || credentials.gmail.token.refresh_token,
  scope: process.env.gmail_scope || credentials.gmail.token.scope,
  token_type: process.env.gmail_token_type || credentials.gmail.token.token_type,
  expiry_date: process.env.gmail_expiry_date || credentials.gmail.token.expiry_date,
};

const link = process.env.form_url || 'example.com';
const survey = `<a href="${link}">Fill it out</a>`;

const gmail = new GoogleMail({
  oauth,
  token: gmailToken,
});

const me = {
  name: 'John Hatcher',
  email: 'john.h.hatcher@gmail.com',
};

const contents = {
  subject: `[Daily Survey] ${new Date()}`,
  html: survey,
};

const errorContents = {
  subject: `[Daily Survey] ${new Date()} ERROR!`,
};

exports.sendSurvey = async () => {
  try {
    await gmail.send(me, me, contents);
  } catch (error) {
    errorContents.html = `<pre>${error.stack}</pre>`;
    await gmail.send(me, me, errorContents);
    /* eslint no-console: off */
    console.error(error);
    throw error;
  }
};
