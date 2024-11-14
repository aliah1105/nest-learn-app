/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
var dbConfig = {
    synchronize: false,
}

console.log('NODE_ENV:', process.env.NODE_ENV);

switch(process.env.NODE_ENV) {
    case 'dev':
        Object.assign(dbConfig, {
            ctype: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js']
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts']
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('Unknown database')
}

console.log('Database Configuration:', dbConfig);

export default dbConfig;