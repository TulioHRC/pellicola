import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.PGHOST,
        port: 5432,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        entities: [
            __dirname + '/../entity/*.entity{.ts,.js}',
        ],
        synchronize: true,
        ssl: true,
        extra: {
          sslmode: "require"
        }
      });

      return dataSource.initialize();
    },
  },
];