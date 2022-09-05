const mongoose =require('mongoose');
// equal to 'const Schema  = mongoose.Schema;'
const { Schema } = mongoose;

// attributes the collection will have
const userSchema = new Schema({
    googleId: String
});

// create mongdb collection
mongoose.model('users', userSchema);