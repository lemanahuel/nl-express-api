module.exports = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo-list',
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  WHITE_LIST_DOMAINS: [
    'http://localhost:5000',
    'http://localhost:5001',
    'http://nl-static-www.herokuapp.com',
    'https://nl-static-www.herokuapp.com',
    'https://nl-express-api.herokuapp.com',
    'https://nl-express-api-prod.herokuapp.com']
}; 