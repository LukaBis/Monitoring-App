const express = require('express');
var request = require('request');
var proxy = require('express-http-proxy');
const path = require("path");
const app = express();
const PORT = 80;

app.use(express.static('./client/build'));
app.use('/api', proxy('http://ec2-3-135-237-46.us-east-2.compute.amazonaws.com:8080'));
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
