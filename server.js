const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const port = process.env.PORT; 

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use ('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
    console.log(`Database is listening and node is running on port ${port}`)});
    }
});