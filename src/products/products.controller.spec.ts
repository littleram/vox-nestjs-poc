import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn().mockResolvedValue([
              {
                productId: '123',
                name: 'Product 1',
              },
              {
                productId: 'abc',
                name: 'Product 2',
              },
            ]),
            getProductById: jest
              .fn()
              .mockImplementation((productId: string) => {
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
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      productsController.getProducts();
      expect(productsService.getProducts).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should find a product by id', () => {
      productsController.getProductById('123');
      expect(productsService.getProductById).toHaveBeenCalled();
      expect(productsController.getProductById('123')).resolves.toEqual({
        productId: '123',
        name: 'Product 1',
      });
    });
  });
});
