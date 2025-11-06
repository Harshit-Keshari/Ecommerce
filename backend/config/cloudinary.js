const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'dkegr0z5s',
  api_key: process.env.CLOUDINARY_API_KEY || '959459296985114',
  api_secret: process.env.CLOUDINARY_SECRET_KEY || 'qKaTx6x0hNPmXBc0cHtWx0TjOKU'
});

console.log('Connected to Cloudinary');

module.exports = cloudinary; // ✅ export the actual object
