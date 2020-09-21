import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AssignDrugsToPharmaceuticalInput } from "./dto/assign-drugs-to-pharmaceutical.input";
import { CreatePharmaceuticalInput } from "./dto/create-pharmaceutical.input";
import { PharmaceuticalService } from "./pharmaceutical.service";
import { PharmaceuticalType } from "./pharmaceutical.type";

@Resolver(of => PharmaceuticalType)
export class PharmaceuticalResolver {

    constructor (
        private pharmaceuticalService: PharmaceuticalService,
    ) {}

    @Query(returns => [PharmaceuticalType])
    getPharmaceuticals(){
        return this.pharmaceuticalService.getPharmaceuticals();
    }

    @Query(returns => PharmaceuticalType)
    getPharmaceuticalById(
        @Args('Id') id: string,
    ){
        return this.pharmaceuticalService.getPharmaceuticalById(id);
    }

    @Mutation(returns => PharmaceuticalType)
    createPharmaceutical(
        @Args('createPharmaceuticalInput') createPharmaceuticalInput : CreatePharmaceuticalInput,
    ){
        return this.pharmaceuticalService.createPharmaceutical(createPharmaceuticalInput);
    }

    @Mutation(returns => PharmaceuticalType)
    assignStudentsToLesson(
        @Args('assignDrugsToPharmaceuticalInput') assignDrugsToPharmaceuticalInput: AssignDrugsToPharmaceuticalInput
    ){
        return this.pharmaceuticalService.assignDrugsToPharmaceuticalInput(assignDrugsToPharmaceuticalInput);
    }
}