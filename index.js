const express = require('express');

const port = 8080; // Constant for the port number
const app = express(); // App is an Express server

// In-memory database of pizzas, i.e. a constant
const pizzas = [
    {
        id: 1,
        type: 'pepperoni',
        spicy: true
    },
    {
        id: 2,
        type: 'hawaiian',
        spicy: false
    },
    {
        id: 3,
        type: 'margarita',
        spicy: false
    }
];

// GET /pizzas
app.get('/pizzas', (req, resp) => {
    // Log which endpoint was hit
    console.log('Endpoint /pizzas hit');

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    // Return the pizzas collection
    resp.send(pizzas);
});

app.get('/pizzas/*', (req, resp) => {
    // Get the id from the URL path
    const id = parseInt(req.params[0]);

    // Log which endpoint was hit
    console.log(`Endpoint /pizzas/${id} hit`);

    // Find the pizza with the id in the request
    const pizza = pizzas.find(pizza => pizza.id === id);

    // Set the Content-Type header of the response
    resp.setHeader('Content-Type', 'application/json');

    // If we found the pizza, return it, else return an error message
    // with status 404 (not found)
    if (pizza) {
        resp.send(pizza);
    } else {
        resp.status(404).send(`{error:"Pizza with ID ${id} not found"}`);
    }
});

// Start the server listening on the port constant
console.log(`Pizza service listening on port ${port}`);
app.listen(port);
