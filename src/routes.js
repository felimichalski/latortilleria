const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'latortilleriaok@gmail.com',
      pass: 'vkbjeqcqtirhwfyj',
    },
});

const { Client } = require('./models/');

router.get('/', (req, res) => {
    let message;
    if(req.app.locals.emailMsg != undefined) {
        message = req.app.locals.emailMsg;
        req.app.locals.emailMsg = undefined;
    }
    res.render('home', {css: 'home', js: 'home', message})
});

router.post('/subscribe', async(req, res) => {
    const email = req.body.email;
    const newClient = new Client({
        email
    });
    try {
        await newClient.save();
        await transporter.sendMail({
            from: '"La Tortilleria" <latortilleriaok@gmail.com>',
            to: email,
            subject: "Confirmación de mail",
            html:  `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;700&display=swap" rel="stylesheet">    <style>
                    html, body {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
            
                    body {
                        background: linear-gradient(#FFC330 50%, #eeeeee 50%);
                        overflow-x: hidden;
                        padding: 2vw 4vw;
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .container {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .card-body {
                        background: linear-gradient(white 50%, white 50%);
                        text-align: center;
                        padding: 1.5rem;
                        border-radius: .7rem;
                    }
            
                    .card-body h2 {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 3.5rem;
                        margin: 1.5rem 0;
                        align-self: center;
                        color: black;
                    }
                    
                    .card-body p {
                        font-family: 'Mukta', sans-serif;
                        font-weight: 300;
                    }
                    
                    .card-body p.welcome {
                        margin: 1.5rem auto 3rem auto;
                        font-size: 1.2rem;
                        width: 80%;
                        color: black;
                    }
            
                    .card-body p.help {
                        margin: 3rem auto 1.5rem auto;
                        color: #c5c5c5;
                        width: 22rem;
                        font-size: .9rem;
                        border: 1px solid #c5c5c5;
                    }
            
                    .card-body a {
                        border: none;
                        border-radius: .4rem;
                        background: #FFC330;
                        font-family: 'Mukta', sans-serif;
                        font-weight: 800;
                        font-size: 1.5rem;
                        padding: .7rem 1.4rem;
                        cursor: pointer;
                        text-decoration: none;
                        color: black;
                    }
            
                    .card-body a:hover {
                        background: #FFD264;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card-body">
                        <h2>Verificá tu mail</h2>
                        <p class="welcome">Gracias por suscribirte a La Tortillería. Para no perderte ninguna de nuestras promociones ni anuncios, te pedimos, como último paso, que verifiques tu correo electrónico.</p>
                        <a href="https://latortilleria.com.ar/verification?email=${email}">VERIFICAR AHORA</a>
                        <p class="help">Si tenés alguna consulta, simplemente respondé a este mail.</p>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        await transporter.sendMail({
            from: '"La Tortilleria" <latortilleriaok@gmail.com>',
            to: '"La Tortilleria" <latortilleriaok@gmail.com>',
            subject: "Nuevo cliente",
            html: `
                <div>Un nuevo cliente se ha registrado con el mail: ${email}</div>
            `
        });
        res.status(200).json({ msg: `Hemos enviado un mensaje de verificación a ${email}` });
    } catch (err) {
        if(err.code == 11000) {
            res.status(409).json({ msg: "El mail ingresado ya ha sido registrado anteriormente" })
        } else {
            res.status(500).json({ msg: "Ha ocurrido un error en la registración del mail, intente nuevamente"});
        }
    }
});

router.post('/message', async(req, res) => {

    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: '"La Tortilleria" <latortilleriaok@gmail.com>',
            to: '"La Tortilleria" <latortilleriaok@gmail.com>',
            subject: "Mensaje de cliente",
            html:  `
            <ul>
                <li>Nombre del cliente: ${name}</li>
                <li>Mail del cliente: ${email}</li>
                <li>Mensaje: ${message}</li>
            </ul>
            `
        });
        res.status(200).json({ msg: "Tu mensaje se ha enviado correctamente" });
    } catch (err) {
        res.status(500).json({ msg: "Ha ocurrido un error, intente nuevamente más tarde"});
    }
});

router.get('/verification', async(req, res) => {
    const email = req.query.email;
    try {
        const client = await Client.find({email});
        if(client[0].isVerified == true) {
            req.app.locals.emailMsg = "El mail ya ha sido verificado anteriormente";
        } else {
            client[0].isVerified = true;
            await client[0].save();
            req.app.locals.emailMsg = "El mail ha sido verificado correctamente";
            await transporter.sendMail({
                from: '"La Tortilleria" <latortilleriaok@gmail.com>',
                to: '"La Tortilleria" <latortilleriaok@gmail.com>',
                subject: "Mail verificado",
                html: `
                    <div>El mail ${email} ha sido verificado correctamente.</div>
                `
            });
        }
    } catch(err) {
        req.app.locals.emailMsg = "Ha ocurrido un error en la verificación del mail";
    }
    res.redirect('/');
});

router.all('/*', (req, res) => {
    res.redirect('/')
})


module.exports = router;