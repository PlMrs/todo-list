import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Todos } from "./Todos";

@Entity()
export class Labels {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column()
    color: string;

    @OneToMany(()=> Todos, todo => todo.labelId)
    todo: Todos[]
}
