const express = require('express')
const app = express.Router()
const fixArrayId = require('../helpers')

let people = [
    {
    "id": 1,
    "image": "url",
    "name": "Jason Wandrag",
    "reference": "Mandams a pretty chilled guy innit."  
    },
    {
    "id": 2,
    "image": "url",
    "name": "Kyle",
    "reference": "Mandams a pretty chilled guy innit."
    },
    {
    "id": 3,
    "image": "url",
    "name": "Dalarno",
    "reference": "Mandams a pretty chilled guy innit."   
    },
    {
    "id": 4,
    "image": "url",
    "name": "Tursha",
    "reference": "Mandams a pretty chilled guy innit."
    }
];

//GET ALL TESTIMONIALS
app.get('/', (req, res) => {
    res.send(people);
});
//GET ONE TESTIMONIAL

app.get('/:id', (req, res) => {
    const person = people.find((person) => person.id == req.params.id);
    if (!person) res.status(404).send({ msg: 'Project not found' });
    res.send(person);
})

//CREATE A TESTIMONIAL (push to array)
app.post('/', (req, res) => {
    let { image, name, reference } = req.body;
    if ( !image || !name || !reference )
        res.status(400).send({ msg: 'Not all info sent.'});
    
    let newTestimonial = {
        id: people.length + 1,
        image,
        name,
        reference
    };
    people.push(newTestimonial);
    res.send(newTestimonial);
});

//UPDATE A TESTIMONIAL (update item in array)
app.put('/:id', (req, res) => {
    // FIND TESTIMONIAL INDEX IN TESTIMONIALS
    let person = people.find((person) => person.id == req.params.id);
    // IF NO TESTIMONIAL FOUND, SEND ERROR
    if (!person) res.status(404).send({ msg: 'Person not found' });
    // GET DATA FROM REQUEST BODY
    let { image, name, reference } = req.body;

    // WRITE DETAILS TO TESTIMONIAL
    if (image) person.image = image;
    if (name) person.name = name;
    if (reference) person.reference = reference;
    // SEND UPDATED TESTIMONIAL
    res.send(person);
  });

//DELETE A TESTIMONIAL (remove from array)
app.delete('/:id', (req, res) => {
    people = people.filter((person) => person.id != req.params.id);
    fixArrayId(people);
    res.send({ msg: "Item Removed" })
});

module.exports = app;