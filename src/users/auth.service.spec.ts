/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService test: ', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>
    const users: User[] = [];
    beforeEach(async () => {
        fakeUserService = {
            find: (email: string) => {
                const filteredUser = users.filter(user => user.email === email);
                return Promise.resolve(filteredUser);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 999999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            }
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
        await service.signup('asdf2@gmail.com', '1');
        try {
            await service.signup('asdf@gmail.com', '1');
        } catch (error) {
            expect(error.message).toEqual('email is used!!');
        }
    });

    it('throw error when sign in with user that email does not exist', async () => {
        await service.signup('hello1@gmail.com', 'hello');
        try {
            await service.signin('hello@gmail.com', 'hello');
        } catch (error) {
            expect(error.message).toEqual('User with this email not found');
        }
    });

    it('throw error if enter invalid password', async () => {
        await service.signup('asdf1@gmail.com', 'test3');
        try {
            await service.signin('asdf1@gmail.com', 'test2');
        } catch (error) {
            expect(error.message).toEqual('Bad identity information');
        }
    });

    it('if enter correct password', async () =>{
        await service.signup('hello@gmail.com', 'test1234');
        await service.signin('hello@gmail.com', 'test1234');
    });
});

