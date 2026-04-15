import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: process.env.SYNCHRONIZE === 'true',
  entities: ['dist/**/*.entity{.ts,.js}'],
});

// export default (): PostgresConnectionOptions => ({
//   type: 'postgres',
//   host: process.env.DB_HOST!,
//   port: parseInt(process.env.DB_PORT!),
//   username: process.env.DB_USERNAME!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
//   synchronize: process.env.SYNCHRONIZE === 'true',
//   entities: ['dist/**/*.entity{.ts,.js}'],
// });

// export default (): SqliteConnectionOptions => ({
//   type: 'sqlite',
//   database: process.env.DATABASE!,
//   synchronize: true,
//   entities: ['dist/**/*.entity{.ts,.js}'],
// });
