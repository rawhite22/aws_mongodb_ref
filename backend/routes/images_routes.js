const express = require('express')
const router = express.Router()
const { uploadImage, getAllImages } = require('../controllers/image_controller')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), uploadImage)
router.get('/', getAllImages)

module.exports = router
