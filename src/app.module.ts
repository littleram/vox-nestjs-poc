import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'test_postgres',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
