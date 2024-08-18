/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => { 
        return Promise.resolve({ id, email: 'asdf@gmail.com', password: 'asdf' } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
       },
      // update: () => { },
      // remove: () => { },
    };

    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => { 
        return Promise.resolve({ id: 1, email, password } as User);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('return one user when call findOneUser', async () => {
    const user = await controller.findOneUser('1');
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });

  it('return list of users when call findUserWithEmail', async () => {
    const users = await controller.findUserWithEmail('asdf@gmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@gmail.com');
  });

  it('throw an error when the findOneUser return null', async () => {
    fakeUserService.findOne = () => null;
    try {
      await controller.findOneUser('1');
    } catch (error) {
      expect(error.message).toEqual('User not found');
    }
  });

  it('singin update session objects and reutrn a user', async () => {
    const session = { userId: -10 }
    const user = await controller.signIn({ email: 'asdf@gmail.com', password: 'asdf' }, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
