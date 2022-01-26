import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/sequelize';

const testProducts = [
  {
    productId: '123',
    name: 'Product 1',
  },
  {
    productId: 'abc',
    name: 'Product 2',
  },
];

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productModel: typeof Product;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: {
            getProducts: jest.fn(() => testProducts),
            getProductById: jest.fn(),
            findAll: jest.fn().mockResolvedValue(testProducts),
            findOne: jest.fn().mockImplementation((productId: string) => {
              return Promise.resolve({
                productId,
                name: 'Product 1',
              });
            }),
          },
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productModel = moduleRef.get<typeof Product>(getModelToken(Product));
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const products = await productsService.getProducts();
      expect(products).toEqual(testProducts);
    });
  });

  describe('getProductById', () => {
    it('should find a product by id', () => {
      const spy = jest.spyOn(productModel, 'findOne');
      expect(productsService.getProductById('123'));
      expect(spy).toBeCalledWith({ where: { productId: '123' } });
    });
  });
});
