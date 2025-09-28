const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Temporary storage (later we’ll use a database)
let workers = [];

// Worker registration route
app.post('/register', (req, res) => {
    const { name, phone, skill } = req.body;
    if(!name || !phone || !skill){
        return res.status(400).json({ error: "Please provide all fields" });
    }
    const newWorker = { id: workers.length + 1, name, phone, skill };
    workers.push(newWorker);
    res.status(201).json({ message: "Worker registered successfully", worker: newWorker });
});

// Test route to get all workers
app.get('/workers', (req, res) => {
    res.json(workers);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
