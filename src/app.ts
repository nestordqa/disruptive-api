import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import contentRoutes from './routes/contentRoutes';

dotenv.config();

const app = express();
app.use(express.json());

//@ts-ignore
mongoose.connect(process.env.MONGODB_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contents', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
