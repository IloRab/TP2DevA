import fastify from 'fastify';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import path from "path"
import { getData } from "./api.js";

const app = fastify()

app.register(fastifyView, {
    engine: {
        handlebars: handlebars,
    },
    root : "/home/node/app/templates",
    options : {partials: {
        header: 'header.hbs',
        footer: 'footer.hbs'
    }}
    //path.join(__dirname,"templates")
})

app.get('/', async (req, res) => {
    const characters = await getData("https://gateway.marvel.com:443/v1/public/characters")
    return res.view("index.hbs",{ json : characters})
})

app.listen({port :3000, host:"0.0.0.0"}, (err) => {
    if (err) throw err;
    console.log(`server listening on 3000`);
});