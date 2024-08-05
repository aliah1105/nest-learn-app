/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService test: ', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>
    beforeEach(async () => {
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of AuthService', async () => {
        expect(service).toBeDefined();
    });

    it('create a new use with salted and hashed password', async () => {
        const user = await service.signup('asdf@gmail.com', 'asdf');

        const [salt, hash] = user.password;

        expect(user.password).not.toEqual('asdf');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throw an error when user sign up with email that already exist', async () => {
        fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        try {
            await service.signup('asdf@gmail.com', '1');
        } catch (error) {
            expect(error.message).toEqual('email is used!!');
        }
    });

    it('throw error when sign in with user that email does not exist', async () => {
        try {
            await service.signin('sdf@sddf.com', '454');
        } catch (error) {
            expect(error.message).toEqual('User with this email not found');
        }
    });

    it('throw error if enter invalid password', async () => {
        fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'asdf@gmail.com', password: 'test' } as User]);
        try {
            await service.signin('asdf@gmail.com', 'test2');
        } catch (error) {
            expect(error.message).toEqual('Bad identity information');
        }
    });

    it('if enter correct password', async () =>{
        fakeUserService.find = () => Promise.resolve([{ email: 'asdf@gmail.com', password: 'f12afb6173d2a64f.aec410de7daac9cf7ff0071a516d9f3e449cd84bcc3223fa58b41c478e68054b' } as User]);
        await service.signin('asdf@gmail.com', 'test1234');
    });
});

