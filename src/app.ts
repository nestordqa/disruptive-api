import { authenticate } from "./middlewares/authenticate";
const cors = require('cors');
const { setupSwagger } = require('./swagger');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const contentRoutes = require('./routes/contentRoutes');
const { createAdminUser } = require('./controllers/userController');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

//@ts-ignore
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await createAdminUser();
  })
  //@ts-ignore
  .catch((err) => console.error(err));

app.use(authenticate);
app.use('/api/', userRoutes);
app.use('/api/', categoryRoutes);
app.use('/api/', contentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`May the force be with you on port ${PORT} 🌟👊🏼`);
  //DOCUMENTACION SWAGGER
  setupSwagger(app);
});

module.exports = app;
