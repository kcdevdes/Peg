const multer = require('multer')
const { v4: uuidv4, v4} = require('uuid');
const path = require('path');


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

function handleUpload (req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Access the uploaded file details
    const file = req.file;
    console.log(file);

    // Process the file as needed
    res.send('File uploaded successfully.');
}

module.exports = {hello, upload, handleUpload}