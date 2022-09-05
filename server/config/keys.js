// check if in production
if (process.env.NODE_ENV == 'production'){
    // run in heroku
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}
