import { Resolver, Query, Args, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { InteractionService } from "./interaction.service";
import { InteractionType } from "./interaction.type";
import { CreateInteractionInput } from "./dto/create-interaction.input"
import { Interaction } from "./interaction.entity";
import { PharmaceuticalService } from "src/pharmaceutical/pharmaceutical.service";
import { GetInteractionsByList } from "./dto/get-interactions-by-list.input";

@Resolver(of => InteractionType)
export class InteractionResolver{
    constructor(
        private interactionService: InteractionService,
        private pharmaceuticalService: PharmaceuticalService,
    ) {}

    @Query(returns => [InteractionType])
    getInteractions(){
        return this.interactionService.getInteractions();
    }


    @Query(returns => [InteractionType])
    getInteractionsByPharmaceuticalId(
        @Args('id') id: string,
    ){
        return this.interactionService.getInteractionByPharmaceuticalId(id);
    }

    @Query(returns => [InteractionType])
    getInteractionsByPharmaceuticalList(
        @Args('getInteractionsByList') getInteractionsByList: GetInteractionsByList,
    ){
        return this.interactionService.getInteractionsByPharmaceuticalList(getInteractionsByList);
    }

    @Mutation(returns => InteractionType)
    createInteraction(
        @Args('createInteractionInput') createInteractionInput: CreateInteractionInput,
    ) {
        return this.interactionService.createInteraction(createInteractionInput);
    }

    @ResolveField()
    async pharmaceuticalId1(@Parent() interaction: Interaction){
        return this.pharmaceuticalService.getPharmaceuticalById(interaction.pharmaceuticalId1);
    }

    @ResolveField()
    async pharmaceuticalId2(@Parent() interaction: Interaction){
        return this.pharmaceuticalService.getPharmaceuticalById(interaction.pharmaceuticalId2);
    }

}