import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { TodosService } from "./service/TodosService";
import * as cors from 'cors';
import { LabelsService } from "./service/LabelsService";

createConnection().then(async connection => {
    
    //Instancier le service pour les todos
    const todoService = new TodosService();
    const labelService = new LabelsService();

    // create express app
    const app = express();

    const allowedOrigins = ['http://localhost:3000'];

    const options: cors.CorsOptions = {
    origin: allowedOrigins
    };

    // Then pass these options to cors:
    app.use(cors(options));

    //Parse de toutes les body envoyés par l'utilisateur en JSON
    app.use(bodyParser.json());

    //Liste de toutes les todos
    app.get('/api/todos', (req: Request, res: Response) => {
        const todos = todoService.all();
        todos.then(result => res.send(result) );
    })

    //création d'une todo
    app.post('/api/todos', (req:Request, res: Response)=>{
        const todoSaved = todoService.save(req);
        todoSaved.then(result => {
            if(result === 422)
                res.status(422).end()
            res.status(201).end();
        }).catch(err => console.log(err))
    })

    //suppression d'une todo grace à son id
    app.delete('/api/todos/:id', (req: Request, res: Response) =>{
        const tryRemove = todoService.remove(req.params.id);
        tryRemove.then(result => {  
            result ? res.status(204).end() : res.status(404).end();    
        });    
    })

    //Modification d'une todo
    app.put('/api/todos/:id', (req: Request, res: Response) =>{
        const change = todoService.change(req.params.id, req.body);
        change.then(result => { res.json({result}) }).catch(error => res.statut(500).json({ error }))
    })

    //Liste de tout les labels
    app.get('/api/labels', (req: Request, res: Response) => {
        const labels = labelService.all();
        labels.then(result => res.send(result) );
    })

    // start express server
    app.listen(5000);

    console.log("Express server has started on port 5000. Open http://localhost:5000/api/todos to see results");

}).catch(error => console.log(error));
