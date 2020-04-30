'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMarshmallows = exports.incrementMarshmallow = exports.insertAccount = undefined;

var _postgres = require('./libs/postgres');

/**
 * Inserts new user into our accounts table. Note that you have
 * to handle if the user already exists
 *
 * @param {float} discordId
 *    discord id of the user (right click user in developer mode)
 * @param {(data: any) => void} callback
 *    Function which will be called after making the query
 * @param {(error: any) => void}} errorHandler
 *    Function which will be called if an error occurs
 */
const insertAccount = exports.insertAccount = ({
  discordId,
  createdAt,
  callback,
  errorHandler
}) => {
  const query = _postgres.sql`
    INSERT INTO accounts(discord_id, created_at) VALUES(${discordId}, ${createdAt})
  `;

  _postgres.db.none(query).then(callback).catch(errorHandler);
};

// Increment marshmallows for a given array of users
/**
 * Methods which manipulate the database or queries it
 */
const incrementMarshmallow = exports.incrementMarshmallow = ({
  discordId, // array of discord ids
  callback,
  errorHandler
}) => {
  const query = _postgres.sql`
    UPDATE accounts SET marshmallows = marshmallows + 1
    WHERE discord_id = ${discordId}
    RETURNING accounts.marshmallows
  `;

  _postgres.db.one(query).then(callback).catch(errorHandler);
};

// Get total marshmallows for a single user
const getMarshmallows = exports.getMarshmallows = ({ discordId, callback, errorHandler }) => {
  const query = _postgres.sql`
    SELECT marshmallows FROM accounts
    WHERE discord_id = ${discordId}
  `;

  _postgres.db.one(query).then(callback).catch(errorHandler);
};