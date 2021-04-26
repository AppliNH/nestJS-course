import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'taskmgmt',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
};