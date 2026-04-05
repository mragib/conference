import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions.js';

export default (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
});
