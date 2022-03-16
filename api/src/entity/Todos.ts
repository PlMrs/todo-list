import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Labels } from "./Labels";

export enum TodoStatut {PROCESSING="en cours", FINISHED="terminé"}

@Entity()
export class Todos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    titre!: string;

    @Column()
    description!: string;

    @Column()
    dueDate!: Date;

    @Column({type: "enum", enum: TodoStatut})
    statut!: string;

    @Column({name: 'labelId' })
    labelId: number;

    @ManyToOne(() => Labels, { nullable: false })
    @JoinColumn({ name: 'labelId' })
    label: Labels;

    @Column()
    creationDate!: Date;

}
