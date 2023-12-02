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
    const {message} = req.body

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'user', content: `${message}`}
        ]
    })
    
    res.json({
        completion: completion.choices[0].message
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})