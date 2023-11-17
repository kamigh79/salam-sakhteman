require('dotenv').config();
export default () => ({
  mongo: {
    uri: process.env.MONGO_DB_URI,
    db: process.env.MONGO_DB_DATABASE,
  },
});
