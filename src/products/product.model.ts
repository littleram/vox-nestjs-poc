import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({ modelName: 'Product', tableName: 'products' })
export class Product extends Model {
  @ApiProperty({ example: 'abc123', description: 'The product id' })
  @PrimaryKey
  @Column(DataType.TEXT)
  productId: string;

  @ApiPropertyOptional({
    example: 'Product 1',
    description: 'Name of the product',
  })
  @Column(DataType.TEXT)
  name: string;

  @ApiPropertyOptional({ example: '234555221' })
  @Column(DataType.TEXT)
  upc: string;

  @ApiPropertyOptional({ example: 'Product Desc' })
  @Column(DataType.TEXT)
  description: string;

  @ApiPropertyOptional({ example: 'https://pyxis-stg.nymag.com' })
  @Column(DataType.TEXT)
  imageUrl: string;

  @Column(DataType.TEXT)
  manufacturer: string;

  @Column(DataType.TEXT)
  brand: string;

  @Column(DataType.TEXT)
  category: string;

  @Column(DataType.TEXT)
  subcategory: string;

  @CreatedAt
  @Column({ defaultValue: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ defaultValue: DataType.NOW })
  updatedAt: Date;

  @Column({ defaultValue: true })
  active: boolean;

  @Column(DataType.TEXT)
  referenceId: string;

  @Default('{}')
  @Column(DataType.JSONB)
  specifications: string;

  @Column({ defaultValue: false })
  swiftypeSync: boolean;
}
