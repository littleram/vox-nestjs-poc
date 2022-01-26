import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create({ ...createProductDto });
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll({ limit: 10 });
  }

  getProductById(productId: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        productId,
      },
    });
  }

  updateProduct(
    productId: string,
    createProductDto: CreateProductDto,
  ): Promise<[number, Product[]]> {
    return this.productModel.update(
      { ...createProductDto },
      {
        where: {
          productId: productId,
        },
        returning: true,
      },
    );
  }

  async deleteProduct(productId: string): Promise<void> {
    const user = await this.getProductById(productId);
    await user.destroy();
  }
}
