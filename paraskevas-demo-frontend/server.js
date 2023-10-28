const express=require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/paraskevas-demo-frontend'));

app.get('/*', (req, res) =>
        res.sendFile('index.html', { root: './dist/paraskevas-demo-frontend/' }),
        );

app.listen(process.env.PORT || 8080);
