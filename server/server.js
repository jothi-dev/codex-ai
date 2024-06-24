// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';
// import OpenAI from 'openai';
// import path from 'path'; 

// dotenv.config();

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client')));

// app.get('/', async (req, res) => {
//     res.status(200).send({
//         message: 'Hello from codex',
//     });
// });


// app.post('/chat', async (req, res) => {
//     console.log('-- req.body', req.body)
//     try {
//         const prompt = req.body.prompt;

//         const response = await openai.chat.completions.create({
//             model: 'gpt-4',
//             messages: [{ role: 'user', content: `${prompt}` }],
//             // stream: true,
//           });

//         console.log('Resp: ', response.choices[0]?.message.content)
//         //   for await (const chunk of stream) {
//         //     process.stdout.write(chunk.choices[0]?.delta?.content || '');
//         //   }

//         // const response = await openai.createCompletion({
//         //     model: 'gpt-3.5-turbo',
//         //     prompt: `${prompt}`,
//         //     temperature: 0,
//         //     max_tokens: 3000,
//         //     top_p: 1,
//         //     frequency_penalty: 0.5,
//         //     presence_penalty: 0,
//         // });

//         res.status(200).send({
//             bot:  response.choices[0]?.message.content || 'no response',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error });
//     }
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));


import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the frontend index.html
});

app.post('/chat', async (req, res) => {
    console.log('-- req.body', req.body);
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `${prompt}` }],
        });

        console.log('Resp: ', response.choices[0]?.message.content);

        res.status(200).send({
            bot: response.choices[0]?.message.content || 'no response',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
