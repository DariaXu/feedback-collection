module.exports = {
    // googleClientID : '170973579851-t1t7fhm1kbfiker8tlm3677v0nh0ct66.apps.googleusercontent.com',
    // googleClientSecret : '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',
    // mongoURI: 'mongodb+srv://dariaxu:3OA8C1blDVJv5VtO@cluster0.qilsrib.mongodb.net/emailyprod?retryWrites=true&w=majority',
    // cookieKey: 'pvnusfbgiqkcmzlqebmodcsan'
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}