import OpenAIApi from 'openai'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import Message from './models/message.js'

mongoose.connect(process.env.DB_URI)
.then((res) => {
    console.log('Connected to DB')
})
.catch((err) => console.log(err))

const openai = new OpenAIApi({
    apiKey: process.env.GPT_API_KEY
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.post('/add-message', (req, res) => {
    console.log(req.body)
    const message = new Message({
        messages: req.body.messages
    })

    message.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/', async (req, res) => {
    let { messages } = req.body
    messages = [{'role': 'system', 'content': process.env.SYSTEM_PROMPT}, ...messages]

    console.log(messages)
    const completion = await openai.chat.completions.create({
        model: process.env.GPT_MODEL,
        messages: messages
    })
    
    res.json({
        completion: completion.choices[0].message
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`http://localhost:${port}`)
})