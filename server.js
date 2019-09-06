const express = require('express');

const server = express();

const port = 3300;
server.listen(port, () => console.log(`API on port ${port}`))

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's rock!</h2>`)
});

const projectData = require('./data/helpers/projectModel')

//GET PROJECT: '/api/projects'
server.get('/api/projects', (req, res) => {
    projectData
            .get()
            .then(projects => {
                console.log(projects)
                res.status(200).json(projects)
            })
    
})

//POST PROJECT: '/api/projects'
server.post('/api/projects', (req,res) => {
    const newProject = req.body;
    const id = req.params
    console.log(id)
    const project = {
        project_id: id,
        name: newProject.name,
        description: newProject.description,
        completed: newProject.completed
    }
    console.log(project)

    projectData
            .insert(project)
            .then(newId => res.status(200).json(newId))
            .catch(err => res.status(500).json({message: "failed to add project"}))
})

//GET PROJECT WITH ID: '/api/projects/:id'
server.get('/api/projects/:id', (req, res) => {
    projectData
            .get(req.params.id)
            .then(project => {
                res.status(200).json(project)
            }
            )
})

//PUT PROJECT: '/api/projects/:id'
server.put('/api/projects/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;

    projectData
            .update(id, changes)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: "failed to update project"})
            })

})

// server.put('api/projects/:id', (req, res) => {
//     projectData
//     .get()
//     .then(projects => {
//         const project = projects.find(h => h.id == req.params.id);
//         if (!project) {
//             res.status(404).json({ message: 'Project does not exist' });
//           } else {
//             Object.assign(project, req.body);
//             res.status(200).json(project);
//           }
//     })  
//   });


//DELETE PROJECT: '/api/projects/:id'
server.delete('/api/projects/:id', (req,res) =>{
    projectData
            .remove(req.params.id)
            .then(project => {
                res.status(200).json({ message: "Project deleted" });
              })
            .catch(err => {
                res.status(500).json({message: "failed to delete project"})
            })
        
})

//GET ACTION
server.get('./')

