import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmaceutical } from './pharmaceutical.entity';
import { PharmaceuticalResolver } from './pharmaceutical.resolver';
import { PharmaceuticalService } from './pharmaceutical.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Pharmaceutical]),
    ],
    providers: [
        PharmaceuticalResolver, 
        PharmaceuticalService
    ],
    exports: [
        PharmaceuticalService,
    ]
})
export class PharmaceuticalModule {}
