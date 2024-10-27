import { authenticate } from "./middlewares/authenticate";

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { createAdminUser } = require('./controllers/userController');

dotenv.config();

const app = express();
app.use(express.json());

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
// app.use('/api/contents', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
