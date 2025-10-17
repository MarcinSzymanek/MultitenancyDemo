import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataExtractorMiddleware } from 'src/common/middleware/DataExtractor.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DataExtractorMiddleware).forRoutes(UsersController);
  }
}
