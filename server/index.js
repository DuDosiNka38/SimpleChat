import express from 'express'
import cors from 'cors'
import events from 'events'

const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    emitter.on('newMessage', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200)
}))


app.listen(PORT, () => console.log(`server started on port ${PORT}`))
// const PORT = 5000

// const server = express()
// const emitter = new events.EventEmitter();
// server.use(cors())
// server.use(express.json())

// server.get('/connect', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'
//       });
//     console.log('2')
//     emitter.on('newMessage', (message) => {
//         res.write(`data: ${JSON.stringify(message)} \n\n`)
        
//     })
   
// })

// server.post('/new-messages', ((req, res) => {
//     console.log('1')
//     const message = req.body;
//     emitter.emit('newMessage', message)
//     res.status(200)
// }))


// server.listen(PORT, () => console.log(`server started on port ${PORT}`))