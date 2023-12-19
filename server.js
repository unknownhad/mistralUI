// server.js
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

app.post('/sendMessage', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const apiResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // Replace with your API key
            },
            body: JSON.stringify({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await apiResponse.json();
        res.json({ message: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
