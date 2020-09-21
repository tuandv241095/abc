import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FoodEnum } from "./pharmaceutical.food.enum";

@ObjectType()
export class PharmaceuticalType {
    @Field(type => ID)
    id: string;

    @Field()
    rxcui : string;

    @Field()
    name: string;

    @Field()
    food: FoodEnum;

    @Field(type => [ID])
    drugs: string[];
}

