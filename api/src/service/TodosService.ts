import {DeleteResult, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Todos} from "../entity/Todos";

export class TodosService {

    //Recupération de la table en base de donnée
    private todosRepository = getRepository(Todos);

    async all(): Promise<Todos[]> {
        return this.todosRepository.find();
    }

    async save(req: Request): Promise<Todos | number> {
        if(!req.body.titre || !req.body.description || !req.body.dueDate || !req.body.statut || !req.body.labelId || !req.body.creationDate)
            return 422
        return this.todosRepository.save(req.body);
    }

    async remove(id: number): Promise<boolean> {
        let done : DeleteResult = await this.todosRepository.delete(id);
        if (done.affected != 1)
            return false
        return true
    }

    async change(id:number, body: Todos): Promise<Todos>{
        const todo = await this.todosRepository.findOne(id);
        if(!todo)
            throw 'Aucune todo trouvé'
        this.todosRepository.merge(todo, body);
        const result = this.todosRepository.save(todo);
        return result;
    }
}