const mongoose =require('mongoose');
// equal to 'const Schema  = mongoose.Schema;'
const { Schema } = mongoose;

// attributes the collection will have
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default:0 }
});

// create mongdb collection
mongoose.model('users', userSchema);