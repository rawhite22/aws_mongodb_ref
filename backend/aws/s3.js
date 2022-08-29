const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
  },
  region: process.env.BUCKET_REGION,
})

const uploadImageS3 = (name, file, conType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: name,
    Body: file,
    ContentType: conType,
  })
  return command
}

const getAllImagesS3 = (name) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: name,
  })
  return command
}

module.exports = {
  s3,
  uploadImageS3,
  getAllImagesS3,
}
