require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

const newsRoutes = require('./routes/news.routes');
app.use(newsRoutes);



app.use(errorMiddleware);



if (require.main === module) {
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}

module.exports = app;