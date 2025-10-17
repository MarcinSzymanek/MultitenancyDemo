import { Test } from '@nestjs/testing';
import { MockMetadata, ModuleMocker } from 'jest-mock';
import { TenantsController } from 'src/modules/tenants/tenants.controller';
import { TenantsService } from 'src/modules/tenants/tenants.service';

const moduleMocker = new ModuleMocker(global);

describe('TenantsController', () => {
  let controller: TenantsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TenantsController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === TenantsService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockMetadata<
            any,
            any
          >;
          const Mock = moduleMocker.generateFromMetadata(
            mockMetadata,
          ) as ObjectConstructor;
          return new Mock();
        }
      })
      .compile();
    controller = moduleRef.get(TenantsController);
  });

  it('should exist', () => {
    expect(controller).toBeDefined();
  });
});
