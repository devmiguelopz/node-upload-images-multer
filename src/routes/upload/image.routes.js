const { Router } = require('express'); 
const path = require('path');
const multer = require('multer');

const router = new Router();

// RENDER FORM UPLOAD
router.get('/images/upload', (req, res) => {
    res.render('index');
});

const uploadImage = multer({
    storage:multer.diskStorage({
        destination: path.join(__dirname, '../../public/uploads'),
        filename:  (request, file, callBack) => callBack(null, file.originalname)
    }),
    limits: {
        fileSize: 1000000
    }
}).single('image');

router.post('/images/upload', (requestServer, responseServer) => {
    uploadImage(requestServer, responseServer, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return responseServer.send(err);
        }
        return responseServer.send('uploaded');
    });
});

module.exports = router;