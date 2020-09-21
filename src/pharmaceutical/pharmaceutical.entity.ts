import { Entity, ObjectIdColumn, Column, PrimaryColumn, Unique } from "typeorm";
import { FoodEnum } from "./pharmaceutical.food.enum";

@Entity()
@Unique(['rxcui','name'])
export class Pharmaceutical{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    rxcui: string;

    @Column()
    name: string;

    @Column()
    food: FoodEnum;

    @Column()
    drugs: string[];
}