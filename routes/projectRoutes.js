const express = require('express')
const app = express.Router()
const fixArrayId = require('../helpers')

let projects = [
    {
    "id": 1,
    "title": "Calculator",
    "image": "https://i.postimg.cc/MKwKsNzm/Screenshot-from-2022-02-01-11-31-39.png",
    "program": "Javascript",
    "repo": "https://github.com/Noshieee/Calculator",
    "live": "https://my-calculator-noshieee.netlify.app/",
    "description": "lorem"    
    },
    {
    "id": 2,
    "title": "Point of Sale",
    "image": "https://i.postimg.cc/LX06Q86q/Screenshot-from-2022-02-01-11-29-17.png",
    "program": "Javascript", 
    "repo": "https://github.com/Noshieee/POS-JavaScript-project",
    "live": "https://kicking-n-screaming-36674.netlify.app/",
    "description": "lorem"
    },
    {
    "id": 3,
    "title": "Reaction Test",
    "image": "https://i.postimg.cc/7hbjjTk8/Screenshot-from-2022-02-01-08-55-05.png",
    "program": "Vue.JS", 
    "repo": "https://github.com/Noshieee/Reaction-test-main_VueJS",
    "live": "https://noshieees-reaction-timer-vue.netlify.app/",
    "description": "lorem"    
    },
    {
    "id": 4,
    "title": "Kanye Quote Fetch api",
    "image": "https://i.postimg.cc/44YHVrBL/Screenshot-from-2022-02-01-11-06-17.png",
    "program": "Codepen", 
    "repo": "https://codepen.io/Noshieee/pen/LYzmmbd?editors=0010",
    "live": "",
    "description": "lorem"
    }
];

//GET ALL PROJECTS
app.get('/', (req, res) => {
    res.send(projects);
});
//GET ONE PROJECT

app.get('/:id', (req, res) => {
    const project = projects.find((project) => project.id == req.params.id);
    if (!project) res.status(404).send({ msg: 'Project not found' });
    res.send(project);
})

//CREATE A PROJECT (push to array)
app.post('/', (req, res) => {
    let { title, image, program, repo, live, description } = req.body;
    if (!title || !image || !program || !repo || !live || !description)
        res.status(400).send({ msg: 'Not all info sent.'});
    
    let newProject = {
        id: projects.length + 1,
        title,
        image,
        program,
        repo,
        live,
        description
    };
    projects.push(newProject);
    res.send(newProject);
});

//UPDATE A PROJECT (update item in array)
app.put('/:id', (req, res) => {
    // FIND PROJECT INDEX IN PROJECTS
    let project = projects.find((project) => project.id == req.params.id);
    // IF NO PROJECT FOUND, SEND ERROR
    if (!project) res.status(404).send({ msg: 'Project not found' });
    // GET DATA FROM REQUEST BODY
    let { title, image, program, repo, live, description } = req.body;

    // WRITE DETAILS TO PROJECT
    if (title) project.title = title;
    if (image) project.image = image;
    if (program) project.program = program;
    if (repo) project.repo = repo;
    if (live) project.live = live;
    if (description) project.description = description;
    // SEND UPDATED PROJECT
    res.send(project);
  });

//DELETE A PROJECT (remove from array)
app.delete('/:id', (req, res) => {
    projects = projects.filter((project) => project.id != req.params.id);
    fixArrayId(projects);
    res.send({ msg: "Item Removed" })
});

module.exports = app;