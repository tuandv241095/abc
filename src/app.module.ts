import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphQLConfigType } from './config/graphQL.config';
import { typeOrmConfig } from './config/typeorm.config';
import { DrugModule } from './drug/drug.module';
import { InteractionModule } from './interaction/interaction.module';
import { PharmaceuticalModule } from './pharmaceutical/pharmaceutical.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot(graphQLConfigType),
    DrugModule,
    InteractionModule,
    PharmaceuticalModule,
  ],
})
export class AppModule {}
