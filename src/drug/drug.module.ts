import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmaceuticalModule } from 'src/pharmaceutical/pharmaceutical.module';
import { Drug } from './drug.entity';
import { DrugResolver } from './drug.resolver';
import { DrugService } from './drug.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Drug]),
        PharmaceuticalModule,
    ],
    providers: [
        DrugResolver, 
        DrugService
    ],
    exports: [
        DrugService,
    ]
})
export class DrugModule {}
