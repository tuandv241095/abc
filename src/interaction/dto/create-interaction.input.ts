import { Field, ID, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, IsUUID, MinLength } from "class-validator";
import { SeverityEnum } from "../interaction-severity.enum";

@InputType()
export class CreateInteractionInput {
    @IsNotEmpty()
    @IsUUID("4")
    @Field(type => ID)
    pharmaceuticalId1: string;

    @IsNotEmpty()
    @IsUUID("4")
    @Field(type => ID)
    pharmaceuticalId2: string;

    @IsOptional()
    @Field()
    source: string;

    @IsNotEmpty()
    @IsIn([SeverityEnum.HIGH, SeverityEnum.MEDIUM, SeverityEnum.LOW])
    @Field()
    severity: SeverityEnum;

    @IsNotEmpty()
    @MinLength(1)
    @Field()
    description: string;
}