const express = require('express');
const http = require('http');
const webSocket = require('ws');

const cors = require('cors');
const { request, response } = require('express');

const app = express();
app.use(cors())

app.use(express.json());

let counter = 0;

let objectCounter = {};

app.post('/wise', (request, response) => {
    const wiseData = request.body;

    const counterWiseOnDigitalOne = wiseData.Record[1][3];


    counter = counterWiseOnDigitalOne

    objectCounter = {
        wiseCounter: counter
    }
    
    console.log(objectCounter)

    return response.send();
})

app.get('/wise', (request, response) => {
    console.log(counter)
    return response.json({
        countWise: counter
    })
})

/*
app.get('/wise', (request, response) => {
    response.json(objectCounter)
})*/


const server = http.createServer(app)
const webSocketServer = new webSocket.Server({ server })

webSocketServer.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);

        let change
        if (counter != change) {
            change = counter
            ws.send(change)
        }
    });

    //send immediatly a feedback to the incoming connection 
    
    ws.send(counter);
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});



app.listen(3333, () => {
    console.log("Server is running on port 3333");
});