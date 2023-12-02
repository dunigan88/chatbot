import OpenAIApi from "openai"
import express from 'express'
import cors from "cors"

const openai = new OpenAIApi({
    apiKey: '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'
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.post('/', async (req, res) => {
    const { messages } = req.body

    console.log(messages)
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            // initial prompt to setup the system
            {'role': 'system', 'content': 'you are batman'},
            ...messages
        ]
    })
    
    res.json({
        completion: completion.choices[0].message
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})