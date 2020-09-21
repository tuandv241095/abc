import { InputType, Field, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignDrugsToPharmaceuticalInput {
    @IsUUID()
    @Field(type => ID)
    pharmaceuticalId: string;

    @IsUUID("4",{each: true})
    @Field(type => [ID])
    drugIds: string[];
}