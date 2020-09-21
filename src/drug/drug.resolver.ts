import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PharmaceuticalService } from "src/pharmaceutical/pharmaceutical.service";
import { CreateDrugInput } from "./dto/create-drug.input";
import { Drug } from "./drug.entity";
import { DrugService } from "./drug.service";
import { DrugType } from "./drug.type";
import { ConflictException } from "@nestjs/common";

@Resolver(of => DrugType)
export class DrugResolver {

    constructor (
        private drugService: DrugService,
        private pharmaceuticalService: PharmaceuticalService,
    ) {}

    @Query(returns => [DrugType])
    getDrugs(){
        return this.drugService.getDrugs();
    }

    @Query(returns => DrugType)
    getDrugById(
        @Args('Id') id: string,
    ){
        return this.drugService.getDrugById(id);
    }

    @Query(returns => [DrugType])
    getDrugsByPharmaceuticalId(
        @Args('pharmaceuticalId') pharmaceuticalId: string,
    ){
        return this.drugService.getDrugsByPharmaceuticalId(pharmaceuticalId);
    }

    @Mutation(returns => DrugType)
    async createDrug(
        @Args('createDrugInput') createDrugInput : CreateDrugInput,
    ){
        return this.drugService.createDrug(createDrugInput);
    }

    @ResolveField()
    async pharmaceuticalId(@Parent() drug: Drug){
        return this.pharmaceuticalService.getPharmaceuticalById(drug.pharmaceuticalId);
    }
}