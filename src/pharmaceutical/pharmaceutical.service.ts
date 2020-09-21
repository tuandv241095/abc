import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePharmaceuticalInput } from './dto/create-pharmaceutical.input';
import { Pharmaceutical } from './pharmaceutical.entity';
import { v4 as uuid } from 'uuid'
import { AssignDrugsToPharmaceuticalInput } from './dto/assign-drugs-to-pharmaceutical.input';

@Injectable()
export class PharmaceuticalService {
    constructor(
        @InjectRepository(Pharmaceutical) private pharmaceuticalRepository: Repository<Pharmaceutical>, 
    ){}

    async getPharmaceuticals(): Promise<Pharmaceutical[]> {
        return this.pharmaceuticalRepository.find();
    }

    async getPharmaceuticalById(id : string): Promise<Pharmaceutical> {
        return this.pharmaceuticalRepository.findOne({id}); 
    }

    async createPharmaceutical(createPharmaceuticalInput: CreatePharmaceuticalInput): Promise<Pharmaceutical> {
        const { rxcui, name, food, drugs } = createPharmaceuticalInput;
        const pharmaceutical = this.pharmaceuticalRepository.create({
            id: uuid(),
            rxcui,
            name,
            food,
            drugs,
        });

        return this.pharmaceuticalRepository.save(pharmaceutical);
    }

    async getPharmaceuticalsInArray(pharmaceuticals: string[]): Promise<Pharmaceutical[]> {
        return this.pharmaceuticalRepository.find({
            where: {
                id: {
                    $in: pharmaceuticals,
                }
            }
        })
    }

    async assignDrugsToPharmaceuticalInput(assignDrugsToPharmaceuticalInput: AssignDrugsToPharmaceuticalInput): Promise<Pharmaceutical> {
        const {pharmaceuticalId, drugIds} = assignDrugsToPharmaceuticalInput;
        const pharmaceutical = await this.getPharmaceuticalById(pharmaceuticalId);
        pharmaceutical.drugs = [...pharmaceutical.drugs, ...drugIds];
        return this.pharmaceuticalRepository.save(pharmaceutical);
    }

}
