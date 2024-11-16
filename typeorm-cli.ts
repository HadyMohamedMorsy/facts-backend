import { DataSource, DataSourceOptions } from "typeorm";
import { Firstmigrations1731712390430 } from "./src/migrations/1731712390430-firstmigrations";

const config = {
  type: "postgres",
  host: `localhost`,
  port: `5432`,
  username: `postgres`,
  password: `123`,
  database: `facts`,
  entities: [__dirname + "/src/**/*.entity{.ts,.js}"],
  migrations: [Firstmigrations1731712390430],
  autoLoadEntities: true,
  synchronize: false,
};

export const connectionSource = new DataSource(config as DataSourceOptions);
