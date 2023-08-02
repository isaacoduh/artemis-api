require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const profileRoutes = require("./routes/profile.routes");
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use("/api/v1/auth", authRoutes); // authentication routes;
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/admin", adminRoutes);

module.exports = app;

// const express = require('express');
// const {Task} = require('./models');

// const app = express();
// app.use(express.json({limit: '5mb'}));
// const PORT = 5100;

// app.get('/roost', async (req, res) => {
//     res.status(200).json({
//         message: 'Welcome to Mobfi'
//     });
// });

// app.post('/create-record', async (req, res) => {
//     const {name, description} = req.body;
//     const t = await Task.create({name, description, done: false});
//     await t.save();

//     return res.json({data: t});
// })

// app.listen(PORT, () => {
//     console.log(`App started on PORT ${PORT}`);
// })
