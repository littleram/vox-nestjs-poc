import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.input';
import { UpdateProductDto } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
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
    updateProductDto: UpdateProductDto,
  ): Promise<[number, Product[]]> {
    return this.productModel.update(
      { ...updateProductDto },
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
