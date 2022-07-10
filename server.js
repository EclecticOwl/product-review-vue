var express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var history = require('connect-history-api-fallback');
let app = express();


app.use(history({

}));

app.use(serveStatic(path.join(__dirname, 'dist')));

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), () => {
console.log(`Derp is running at localhost: ${app.get('port')}`);
});