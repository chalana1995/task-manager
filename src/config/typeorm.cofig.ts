import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'linksyswith3com',
    database: 'taskmanagment',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
}