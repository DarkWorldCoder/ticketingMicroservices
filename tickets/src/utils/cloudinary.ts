import cloudinary from "cloudinary"


// dotenv.config()

// console.log(process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_SECRET)
cloudinary.v2.config({
  cloud_name: "ayushniroula",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure:true
});
export default cloudinary