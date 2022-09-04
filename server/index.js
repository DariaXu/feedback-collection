// commonjs module
const express = require('express');
// application(running express app)
const app = express();

// res=>request, res => responds
app.get('/', (req, res) => {
    // send json data
    res.send({ hi : 'there, byebye' });
});

// telling node js to listen to port 8000
const PORT = process.env.PORT || 8000
app.listen(PORT);