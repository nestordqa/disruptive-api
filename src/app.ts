import { authenticate } from "./middlewares/authenticate";

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

//@ts-ignore
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  //@ts-ignore
  .catch((err) => console.error(err));

app.use(authenticate);
app.use('/api/users', userRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/contents', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
