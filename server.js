const express = require('express');

const server = express();

const port = 3300;
server.listen(port, () => console.log(`API on port ${port}`))

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's rock!</h2>`)
});

const projectData = require('./data/helpers/projectModel')
const actionData = require('./data/helpers/actionModel')

//GET PROJECT
server.get('/api/projects', (req, res) => {
    projectData
            .get()
            .then(projects => {
                console.log(projects)
                res.status(200).json(projects)
            })
    
})

//POST PROJECT
server.post('/api/projects', (req,res) => {
    const newProject = req.body;
    // const id = req.params.id
    // console.log(id)
    const project = {
        // project_id: id,
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

//GET PROJECT WITH ID
server.get('/api/projects/:id', (req, res) => {
    projectData
            .get(req.params.id)
            .then(project => {
                res.status(200).json(project)
            }
            )
            .catch(err => {
                res.status(500).json({message: "failed to get projects"})
            })
})

//UPDATE PROJECT
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


//DELETE PROJECT
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

//GET PROJECT ACTIONS
server.get('/api/projects/:id/actions', (req,res) => {
    projectData
            .getProjectActions(req.params.id)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(err => {
                res.status(500).json({message: "failed to get actions"})
            })
})

//GET A SPECIFIC PROJECT ACTION
server.get('/api/projects/:id/actions/:id', (req,res) => {
    actionData
    .get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    }
    )
    .catch(err => {
        res.status(500).json({message: "failed to get projects"})
    })
})

//POST PROJECT ACTIONS
server.post('/api/projects/:id/actions', (req,res) => {
    const newAction = req.body
    const id = req.params.id
    console.log(id)
    const action = {
        project_id: id,
        description: newAction.description,
        notes: newAction.notes,
        completed: newAction.completed
    }
    console.log(action)
    actionData
            .insert(action)
            .then(newId => res.status(200).json(newId))
            .catch(err => res.status(500).json({message: "failed to add action"}))

})

//UPDATE AN ACTION
server.put('/api/projects/:id/actions/:id', (req,res) => {

})

//DELETE AN ACTION
server.delete('/api/projects/:id/actions/:id', (req,res) => {
    
})

