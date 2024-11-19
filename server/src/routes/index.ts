import { Router } from 'express';
import bookRoute from 'src/routes/book.route';
import memberRoute from 'src/routes/member.route';

// Index
const indexRoute = Router();

indexRoute.get('', async (req, res) => {
  res.json({ message: 'Welcome User' });
});

// indexRoute.use('/users', userRoute);
indexRoute.use('/member', memberRoute);
indexRoute.use('/book', bookRoute);

export default indexRoute;
