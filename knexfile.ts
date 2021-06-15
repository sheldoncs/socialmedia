import "dotenv/config";

export = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `./src/data/migrations`,
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/src/dats/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/data/seeds`,
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 5,
    },
  },

  // test: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL_TEST,
  //   migrations: {
  //     directory: './src/migrations'
  //   },
  //   seeds: {
  //     directory: './src/seeds/test'
  //   },
  //   useNullAsDefault: true
  // },
};
