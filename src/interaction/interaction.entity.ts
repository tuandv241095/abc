import { Entity, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import { SeverityEnum } from "./interaction-severity.enum";

@Entity()
export class Interaction{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    pharmaceuticalId1: string;

    @Column()
    pharmaceuticalId2: string;

    @Column()
    source: string;

    @Column()
    severity: SeverityEnum;

    @Column()
    description: string;

}