/* ekRank site settings — edit these values, no other code changes needed. */
window.EKRANK_CONFIG = {
  // Demo-form leads are emailed here via FormSubmit (https://formsubmit.co).
  // The FIRST submission sends an activation email to this address — click it once to start receiving leads.
  leadEmail: 'hello@ekrank.com',

  // Optional: your own endpoint (Google Apps Script, Zapier, CRM webhook…). If set, leads are POSTed here as JSON too.
  leadWebhook: '',

  // WhatsApp number (country code + number, digits only). Used for the demo form and all WhatsApp buttons.
  whatsapp: '917331120766',

  // Open WhatsApp with the lead details pre-filled after the form is submitted (as in the design).
  openWhatsAppOnSubmit: true,

  // App store links. Leave empty to send visitors to the web app (works on any device).
  appStoreUrl: '',
  playStoreUrl: '',
  webAppUrl: 'https://app.ekrank.com',

  // Value sent with the GA4 / GTM "generate_lead" event (INR).
  leadValue: 199
};
