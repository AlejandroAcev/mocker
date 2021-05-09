'use strict';
const uuid_generate_v4 = require('uuid').v4;

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('accounts', {
    columns: {
      id: {
        type: 'string',
        length: 255,
        primaryKey: true,
        unique: true,
        // defaultValue: new String(uuid_generate_v4())
      },
      name: {
        type: 'string',
        length: 255
      },
      type: {
        type: 'string',
        length: 255
      },
      plan_id: {
        type: 'string',
        length: 255
      },
      endpoints_active: {
        type: 'int',
      },
      endpoints_created: {
        type: 'int',
      },
      request_completed: {
        type: 'int',
      },
      request_next_limit: {
        type: 'int',
      },
      endpoints: {
        type: 'string',
      },
      users: {
        type: 'text',
      },
      created_at: {
        type: 'string',
        length: 255,
      },
      updated_at: {
        type: 'string',
        length: 255,
      },
    },
    ifNotExists: true
  }, (error) => {
    if (error) return callback(error);
    return callback();
  }); 
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
