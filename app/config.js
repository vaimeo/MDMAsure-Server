require('dotenv').config();
const env = process.env;
const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  pubSubTopic: env.PUBSUB_TOPIC,
  projectId: env.PROJECT_ID,
  signupCallbackUrl:env.PROVESION_URL,
  port:env.SERVER_PORT
};
module.exports = config;