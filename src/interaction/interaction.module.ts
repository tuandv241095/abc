import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmaceuticalModule } from 'src/pharmaceutical/pharmaceutical.module';
import { Interaction } from './interaction.entity';
import { InteractionResolver } from './interaction.resolver';
import { InteractionService } from './interaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interaction]),
    PharmaceuticalModule,
  ],
  providers: [
    InteractionResolver,
    InteractionService,
  ]
})
export class InteractionModule {}
