import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDrugInput } from './dto/create-drug.input';
import { Drug } from './drug.entity';
import { v4 as uuid } from 'uuid'
import { PharmaceuticalService } from 'src/pharmaceutical/pharmaceutical.service';
import { AssignDrugsToPharmaceuticalInput } from 'src/pharmaceutical/dto/assign-drugs-to-pharmaceutical.input';

@Injectable()
export class DrugService {
    constructor(
        @InjectRepository(Drug) private drugRepository: Repository<Drug>, 
        private pharmaceuticalService: PharmaceuticalService,
    ){}

    async getDrugs(): Promise<Drug[]> {
        return this.drugRepository.find();
    }

    async getDrugById(id : string): Promise<Drug> {
        const drug = await this.drugRepository.findOne({id});
        if(drug){
            return drug;
        }else {
            throw new InternalServerErrorException(`Failed to get drug! Filter: Id = "${id}"`);
        }
        
    }

    async createDrug(createDrugInput: CreateDrugInput): Promise<Drug> {
        const { name, pharmaceuticalId } = createDrugInput;

        const pharmaceitical = await this.pharmaceuticalService.getPharmaceuticalById(pharmaceuticalId);

        if( pharmaceitical != null ){
            const drug = this.drugRepository.create({
                id: uuid(),
                name,
                pharmaceuticalId,
            });

            await this.drugRepository.save(drug);

            const newAssign = new AssignDrugsToPharmaceuticalInput();
            newAssign.pharmaceuticalId = pharmaceuticalId;
            newAssign.drugIds = [drug.id];
            
            await this.pharmaceuticalService.assignDrugsToPharmaceuticalInput(newAssign);
            
            return drug;
            
        }else{
            throw new InternalServerErrorException(`PharmaceuticalId "${pharmaceuticalId}" is not exiests`);
        }
        
    }

    async getDrugsInArray(drugs: string[]): Promise<Drug[]> {
        const druglist : Drug[] = await this.drugRepository.find({
            where: {
                id: {
                    $in: drugs,
                }
            }
        });

        return druglist;
    }

    async getDrugsByPharmaceuticalId(pharmaceuticalId: string) : Promise<Drug[]> {
        const druglist : Drug[] = await this.drugRepository.find({
            where: {
                pharmaceuticalId: pharmaceuticalId,
            }
        });
        return druglist;
    }
    
}
