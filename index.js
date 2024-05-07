const { NlpManager } = require('node-nlp');
const express = require('express');
const app = express();
const manager = new NlpManager({ languages: ['en'] });
const cors = require('cors');
// Adds the utterances and intents for the NLP
app.use(cors())
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'what people call you , greeting.name');
manager.addDocument('en', 'who are you', 'greetings.name ?');
manager.addDocument('en', 'name ?', 'greetings.name');
manager.addDocument('en', 'welcome ', 'greetings.thankyou');
manager.addDocument('en', 'see you later ', 'greetings.bye');
manager.addDocument('en', 'good', 'greetings.thanks you ');
manager.addDocument('en', 'what\'s your name', 'greetings.name');
manager.addDocument('en', 'tell me your name', 'greetings.name');
manager.addDocument('en', 'who are you', 'greetings.name');


// Train also the NLG
manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'See you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.name', 'Im luffy powered_by_nidun.');
manager.addAnswer('en', 'greetings.name', 'Im luffy powered_by_nidun.');
manager.addAnswer('en', 'greetings.and you', 'My name is luffy powered_by_nidun.');
manager.addAnswer('en', 'greetings.thank you', 'You\'re welcome!');
manager.addAnswer('en', 'greetings.good', 'Thanks');
manager.addAnswer('en', 'greetings.name', 'I\'m Luffy, powered by Nidun.');
manager.addAnswer('en', 'greetings.name', 'You can call me Luffy, powered by Nidun.');
// Train and save the model.
manager.train().then(async () => {
    manager.save();
    app.get('/bot', async (req, res) => {
        try {
            const { message } = req.query;
            if (!message) {
                return res.status(400).json({ error: 'Message is required' });
            }
            let response = await manager.process('en', message);
            res.json({ answer: response.answer || 'Rephrase please' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.error('Error during training:', err);
});
