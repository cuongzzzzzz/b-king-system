const mongoose = require("mongoose");
const slugify = require("slugify")
const COLLECTION_NAME = "Province";
const DOCUMENT_NAME = "Provinces";
const ProvinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String, required: true,
    },
    zipcode: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: String,
      enum: ['Miền Bắc', 'Miền Trung', 'Miền Nam'],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
ProvinceSchema.pre("save", () => {
  this.slug = slugify(this.name, { lower: true })
})


const Province = mongoose.model(DOCUMENT_NAME, ProvinceSchema);

module.exports = Province;
