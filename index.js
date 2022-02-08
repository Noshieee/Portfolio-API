const express = require('express');
const projectRoutes = require('./routes/projectRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({msg: "Welcome to Enosh's Backend"});
});

app.use('/projects', projectRoutes);
app.use('/people', testimonialRoutes);

const port = process.env.PORT || 5800;
app.listen(port, () => console.log(`Listening on port ${port}...`));