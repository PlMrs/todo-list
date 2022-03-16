import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Labels} from "../entity/Labels";

export class LabelsService {

    private labelsRepository = getRepository(Labels);

    async all(): Promise<Labels[]> {
        return this.labelsRepository.find();
    }

}