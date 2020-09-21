import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsUUID, MinLength } from "class-validator";

@InputType()
export class CreateDrugInput {
    @IsNotEmpty()
    @Field()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsUUID("4")
    @Field(type => ID)
    pharmaceuticalId: string;
}