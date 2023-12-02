import OpenAIApi from 'openai'
import express from 'express'
import cors from 'cors'
import fs from 'fs'

const openai = new OpenAIApi({
    apiKey: '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'
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//     fs.readFile('./index.html', 'utf8', (err, html) => {
//         if (err) {
//             res.status(500).send('sorry, out of order')
//         }

//         res.send(html)
//     })
// })

app.use(express.static('public'))

app.post('/', async (req, res) => {
    let { messages } = req.body
    messages = [{'role': 'system', 'content': 'you are batman'}, ...messages]

    console.log(messages)
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
    })
    
    res.json({
        completion: completion.choices[0].message
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})