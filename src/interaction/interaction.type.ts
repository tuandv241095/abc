import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PharmaceuticalType } from "src/pharmaceutical/pharmaceutical.type";
import { SeverityEnum } from "./interaction-severity.enum";

@ObjectType()
export class InteractionType {
    @Field(type => ID)
    id: string;

    @Field(type => PharmaceuticalType)
    pharmaceuticalId1: string;

    @Field(type => PharmaceuticalType)
    pharmaceuticalId2: string;

    @Field()
    source: string;

    @Field()
    severity: SeverityEnum;

    @Field()
    description: string;
}