const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
    },
    product: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    imageName: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Image', imageSchema)
