const express = require('express');
const app = express();

app.set('view-engine', 'ejs');

app.engine('ejs', require('express-ejs-extend'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.render('forum.ejs', { name : 'Mikey_'});
});

app.listen(3000);
