import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PharmaceuticalType } from "src/pharmaceutical/pharmaceutical.type";

@ObjectType()
export class DrugType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => PharmaceuticalType)
    pharmaceuticalId: string;
}