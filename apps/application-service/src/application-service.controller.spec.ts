import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationServiceController } from './application-service.controller';
import { ApplicationServiceService } from './application-service.service';

describe('ApplicationServiceController', () => {
  let applicationServiceController: ApplicationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationServiceController],
      providers: [ApplicationServiceService],
    }).compile();

    applicationServiceController = app.get<ApplicationServiceController>(ApplicationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(applicationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
