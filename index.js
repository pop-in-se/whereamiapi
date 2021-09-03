const fs = require('fs')
const express = require('express')
const fetch = require('node-fetch')


// server setup

const server = express();
const port = 3000;
server.listen(port, () => console.log("Applikationen är igång"))

server.use(express.static('public'))
server.use(express.json())
server.use(express.urlencoded({ extended: true })); 


server.get('/api', (req, res) => {
    let inputData = fs.readFileSync("city.json")
    let city = JSON.parse(inputData)
    res.json(city)
})


server.post('/api', (req, res) => {
    try {
        let inputData = fs.readFileSync("city.json")
        let city = JSON.parse(inputData)
        city.push(req.body)
        fs.writeFileSync("city.json", JSON.stringify(city))
        res.json("Sparat")
    } catch(err) {
        console.error(err)
        res.status(500).json(Error)
    }
})

