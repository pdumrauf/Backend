const configMysql = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ecommerce",
    },
  };
  
  const configSqlite = {
    client: "sqlite3",
    connection: {
      filename: "./db/ecommerce.sqlite",
    },
  };
  
  module.exports = { configMysql, configSqlite };