import { CosmosClient } from "@azure/cosmos";

const cosmosConfig = {
  endpoint: process.env.COSMOSDB_URI,
  primaryKey: process.env.COSMOSDB_PRIMARY_KEY,
  database: process.env.COSMOSDB_DATABASE,
  container: process.env.COSMOSDB_CONTAINER,
  partitionKey: {
    paths: ["/id"],
  },
};

export const initDB = async () => {
  const cosmosClient = new CosmosClient({
    endpoint: cosmosConfig.endpoint,
    key: cosmosConfig.primaryKey,
  });
  const { database } = await cosmosClient.databases.createIfNotExists({
    id: cosmosConfig.database,
  });

  const { container } = await database.containers.createIfNotExists({
    id: cosmosConfig.container,
    partitionKey: cosmosConfig.partitionKey,
  });

  return {
    cosmosClient,
    database,
    container,
  };
};
