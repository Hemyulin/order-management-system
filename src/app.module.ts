import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class', // NOT SURE ABOUT THIS HERE.
        // The path property of the definitions object indicates where to save generated TypeScript output.
        // By default, all generated TypeScript types are created as interfaces.
        // To generate classes instead, specify the outputAs property with a value of 'class'.
        // https://docs.nestjs.com/graphql/quick-start
      },
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
