import { Entity, ObjectIdColumn, Column, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Drug{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    pharmaceuticalId: string;

}