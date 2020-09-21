import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInteractionInput } from './dto/create-interaction.input';
import { Interaction } from './interaction.entity';
import { v4 as uuid } from 'uuid'
import { GetInteractionsByList } from './dto/get-interactions-by-list.input';

@Injectable()
export class InteractionService {
    constructor(
        @InjectRepository(Interaction) private interactionRepository: Repository<Interaction>,
    ) {}

    async getInteractions(): Promise<Interaction[]>{
        return this.interactionRepository.find();
    }

    async getInteractionsById(id: string): Promise<Interaction[]>{
        return this.interactionRepository.find({id});
    }

    async getInteractionByPharmaceuticalId(id: string): Promise<Interaction[]> {
        return this.interactionRepository.find({
            where: {
                $or: [
                    {pharmaceuticalId1: id},
                    {pharmaceuticalId2: id}
                ]
            }
        });
    }

    async getInteractionsByPharmaceuticalList(getInteractionsByList: GetInteractionsByList): Promise<Interaction[]> {
        const list :string[] = getInteractionsByList.ids;
        return this.interactionRepository.find({
            where: {
                pharmaceuticalId1: {$in: list},
                pharmaceuticalId2: {$in: list}
            }
        });
    }

    async createInteraction(createInteractionInput: CreateInteractionInput): Promise<Interaction> {
        const { pharmaceuticalId1, pharmaceuticalId2, source, severity, description } = createInteractionInput;
        const interaction = this.interactionRepository.create({
            id: uuid(),
            pharmaceuticalId1,
            pharmaceuticalId2,
            source,
            severity,
            description,
        });
        return this.interactionRepository.save(interaction);
    }
}
