const express = require('express');
const hbs = require('hbs');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8080;

const app = express();

require('./hbs/helpers');

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.use(fileUpload());

app.get('/', (req, res) => {

    res.render('home');

});

app.post('/update', (req, res) => {

    let FACservice = req.files.file;

    FACservice.mv(`./public/files/${FACservice.name}`, err => {

        if (err) {
            return res.status(404).json({
                ok: false,
                message: 'No se envio ningun archivo al directorio'
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'El archivo se ha mandado correctamente'
        });

    });
});


app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
});