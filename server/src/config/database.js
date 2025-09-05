// Database configuration (for future use)
// Currently not using a database, but structure is ready for when needed

const config = {
  development: {
    // SQLite for development
    dialect: 'sqlite',
    storage: './database/dev.sqlite3'
  },
  production: {
    // PostgreSQL for production
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'resume_builder',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production'
  }
};

module.exports = config;
