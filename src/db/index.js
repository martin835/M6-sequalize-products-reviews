import { Sequelize } from "sequelize";

const { PGHOST, PGUSER, PGPORT, PGPASSWORD, PGDATABASE, NODE_ENV } =
  process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  ...(NODE_ENV === "production" && {
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnauthorized: false,
      },
    },
  }),
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
};

export const syncDB = async () => {
  try {
    await sequelize.sync(/* { force: true }, */ { logging: false });
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
