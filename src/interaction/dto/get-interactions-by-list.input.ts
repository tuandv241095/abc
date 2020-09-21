import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class GetInteractionsByList {
    @IsUUID("4",{each:true})
    @Field(type => [ID])
    ids: string[];
}