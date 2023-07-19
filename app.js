const express = require('express');
const {Task} = require('./models');

const app = express();
app.use(express.json({limit: '5mb'}));
const PORT = 5100;

app.get('/roost', async (req, res) => {
    res.status(200).json({
        message: 'Welcome to Mobfi'
    });
});

app.post('/create-record', async (req, res) => {
    const {name, description} = req.body;
    const t = await Task.create({name, description, done: false});
    await t.save();

    return res.json({data: t});
})

app.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
})