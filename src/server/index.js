const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const fetch = require('node-fetch');
const URL='https://api.meaningcloud.com/sentiment-2.1'

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use (bodyParser.json())

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
const apiKEY = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const port=8081;
app.listen(port,function(){
    console.log(`server is working on ${port}`);
});


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//POST route
app.post("/api", async function(req, res){
    userInput=req.body.name;
    console.log(userInput);
    const apiURL=`${URL}key=${apiKEY}&url=${userInput}&lang=en`
    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)
})