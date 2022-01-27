import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.input';
import { UpdateProductDto } from './dto/update-product.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('default')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new Product to the database' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get Products Limiting the Results by 10' })
  @ApiOkResponse({ description: 'Successful Operation' })
  @ApiBadRequestResponse({ description: 'Invalid status value' })
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Finds a Product by Id' })
  @ApiOkResponse({ description: 'Successful Operation', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  getProductById(@Param('id') productId: string): Promise<Product> {
    return this.productsService.getProductById(productId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specified fields in an existing Product' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  updateProduct(
    @Param('id') productId: string,
    @Body() updateUserDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an existing Product' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  deleteProduct(@Param('id') productId: string): Promise<void> {
    return this.productsService.deleteProduct(productId);
  }
}
