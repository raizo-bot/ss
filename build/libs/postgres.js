"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sql = exports.pgp = exports.knex = exports.db = undefined;

var _knex = require("knex");

var _knex2 = _interopRequireDefault(_knex);

var _pgPromise = require("pg-promise");

var _pgPromise2 = _interopRequireDefault(_pgPromise);

var _sqlTemplateStrings = require("sql-template-strings");

var _sqlTemplateStrings2 = _interopRequireDefault(_sqlTemplateStrings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv is called before this
const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
};

// Allows Promises for PostgreSQL
/**
 * Sets up the database connections so we can access
 * and manipulate it
 */
const pgp = (0, _pgPromise2.default)();
// Create database object
const db = pgp(connection);
// Create object for query builder
// knex is not really being used right now, might be removed
const knex = (0, _knex2.default)({ client: "pg", connection });

exports.db = db;
exports.knex = knex;
exports.pgp = pgp;
exports.sql = _sqlTemplateStrings2.default;