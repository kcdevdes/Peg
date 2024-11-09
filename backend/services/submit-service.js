const multer = require('multer')
const { v4: uuidv4, v4} = require('uuid');
const path = require('path');
const { spawn } = require('child_process');

function hello (req, res) {
    res.send("Hello World - Submit Service")
}

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Files will be saved in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname)) // Unique file naming
    }
});

const upload = multer({ storage: storage });

async function handleUpload (req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Access the uploaded file details
    const file = req.file;
    console.log(file);


    const pythonProcess = await spawn('python3', ['python/script.py', file.path]); // Use 'python' if python3 is not needed

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        res.json(JSON.parse(data.toString()))
    });
    pythonProcess.stderr.on('data', (data) => {
        res.status(500).json({ error: `Internal Server Error: ${data}` });
    });
}

module.exports = {hello, upload, handleUpload}