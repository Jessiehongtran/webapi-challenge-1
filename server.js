const express = require('express');

const server = express();

const port = 3300;
server.listen(port, () => console.log(`API on port ${port}`))

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's rock!</h2>`)
});

const projectData = require('./data/helpers/projectModel')

//GET: '/api/projects'
server.get('/api/projects', (req, res) => {
    projectData
            .get()
            .then(projects => {
                console.log(projects)
                res.status(200).json(projects)
            })
    
})

//POST: '/api/projects'
