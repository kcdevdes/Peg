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

    const file = req.file;
    console.log(file);

    try {
        const pythonProcess = await spawn('python3', ['python/script.py', file.path]);

        let output = '';
        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
            output += data.toString(); // Collect all stdout data
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error("ERROR:", data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Process was successful, send back the output as JSON
                try {
                    res.json(JSON.parse(output));
                } catch (err) {
                    res.status(500).send('Failed to parse Python output.');
                }
            } else {
                res.status(500).send(`Python process exited with code ${code}`);
            }
        });
    } catch (error) {
        console.error("Error spawning Python process:", error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {hello, upload, handleUpload}