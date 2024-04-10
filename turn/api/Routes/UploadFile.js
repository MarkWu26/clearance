const express = require('express');
const multer = require('multer');
const cors = require('cors');
const db = require('../utils/db');
const UploadFileController = require('../Controllers/UploadFileController');
const router = express.Router();

router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix) 
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

const allowedMimeTypes = [
  'text/csv', 'text/xml', 'application/json', 'text/plain', 
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];


const validateMimeTypes = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const invalidFiles = req.files.filter(file => !allowedMimeTypes.includes(file.mimetype));

  if (invalidFiles.length > 0) {
    const invalidMimeTypes = invalidFiles.map(file => file.mimetype).join(', ');
return res.status(400).send(`File type not supported for mime types: ${invalidMimeTypes}`);
  }

  next(); // Continue to the next middleware if all files are valid
};


// Route for uploading files
router.post('/upload', upload.array('file', 5), validateMimeTypes, async (req, res) => {
  try {
    console.log('request: ', req);
    for (let file of req.files) {
      await UploadFileController.processFile(file);
    }

    res.json({
      success: true,
      message: 'All files have been processed.'
    });
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).json({ success: false, message: 'Error processing files. Please try again.' });
  }
});

// Route to fetch list of uploaded files
router.get('/uploaded-files', async (req, res) => {
  try {
    const files = await db.getUploadedFiles();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ success: false, message: 'Error processing files. Please try again.' });
  }
});

// Correct route setup in your server code
router.post('/upload-and-parse', upload.array('file', 5), validateMimeTypes, async(req,res) => {

  try {
    for (let file of req.files) {
     const response = await UploadFileController.uploadAndParse(file);
     console.log('response: ', response);

     if(!response.success){
       return res.status(500).json({ success: false, message: response.message });
     }
    }
    res.json({
      success: true,
      message: 'All files have been processed.'
    });
  } catch (error) {
    console.log('Error processing files:', error);
    res.status(500).json({ success: false, message: 'Error processing files. Please try again.' });
  }
 
});


module.exports = router;