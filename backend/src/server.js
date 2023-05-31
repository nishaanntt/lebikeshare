if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

require('./config/db');

const path = require('path');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const errorMiddleware = require('./middleware/error');

const AuthRouter = require('./routes/auth.routes');
const UserRouter = require('./routes/user.routes');
const AdminRouter = require('./routes/admin.routes');
const PaymentRouter = require('./routes/payment.routes');
const BookingsRouter = require('./routes/bookings.routes');
const FeedbackRouter = require('./routes/feedback.routes');

app.use(express.json());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/booking', BookingsRouter);
app.use('/api/v1/payments', PaymentRouter);
app.use('/api/v1/feedback', FeedbackRouter);

app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`The server is running on PORT: ${port}`);
});
