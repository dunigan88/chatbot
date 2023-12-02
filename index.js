import OpenAIApi from 'openai'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const openai = new OpenAIApi({
    apiKey: process.env.GPT_API_KEY
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.post('/', async (req, res) => {
    let { messages } = req.body
    messages = [{'role': 'system', 'content': process.env.SYSTEM_PROMPT}, ...messages]

    console.log(messages)
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
    })
    
    res.json({
        completion: completion.choices[0].message
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`http://localhost:${port}`)
})