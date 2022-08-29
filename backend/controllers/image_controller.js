const asyncHandler = require('express-async-handler')
const Image = require('../models/imageModel')
const { s3, uploadImageS3, getAllImagesS3 } = require('../aws/s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const uploadImage = asyncHandler(async (req, res) => {
  try {
    const existingImage = await Image.find({ imageName: req.body.name })
    if (existingImage.length > 0) {
      res.status(400).json({ message: 'Image name already exists' })
    } else {
      const command = uploadImageS3(
        req.body.name,
        req.file.buffer,
        req.file.mimetype
      )
      const S3res = await s3.send(command)
      const image = await Image.create({
        imageName: req.body.name,
        imageUrl: null,
        product: req.body.product,
      })
      res.status(200).json({ image, S3res })
    }
  } catch (error) {
    throw new Error(error.message)
  }
})

const getAllImages = asyncHandler(async (req, res) => {
  try {
    const images = await Image.find()
    if (images.length === 0) {
      res.status(400).json({ msg: 'Could not find any images' })
    } else {
      for (const img of images) {
        const command = getAllImagesS3(img.imageName)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        const updateImgUrl = await Image.findByIdAndUpdate(img.id, {
          imageUrl: url,
        })
      }
      const updatedImages = await Image.find()
      res.status(200).json({ updatedImages })
    }
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = {
  uploadImage,
  getAllImages,
}
