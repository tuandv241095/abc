import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsUUID, IS_BOOLEAN, MinLength } from "class-validator";
import { FoodEnum } from "../pharmaceutical.food.enum";

@InputType()
export class CreatePharmaceuticalInput {
    @IsNotEmpty()
    @MinLength(1)
    @Field()
    rxcui: string;

    @MinLength(1)
    @IsNotEmpty()
    @Field()
    name: string;

    @IsIn([FoodEnum.YES,FoodEnum.NO,FoodEnum.NI])
    @IsOptional()
    @Field()
    food: FoodEnum;

    @IsOptional()
    @IsUUID("4",{ each: true })
    @Field(()=> [ID],{ defaultValue: [] })
    drugs: string[];
}