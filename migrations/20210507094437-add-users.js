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
  db.createTable('users', {
    columns: {
      id: {
        type: 'string',
        length: 255,
        primaryKey: true,
        unique: true,
        // defaultValue: new String('uuid_generate_v4()')
      },
      name: {
        type: 'string',
        length: 255
      },
      lastname: {
        type: 'string',
        length: 255
      },
      email: {
        type: 'string',
        length: 255,
        unique: true
      },
      date_of_birth: {
        type: 'string',
        length: 255
      },
      role: {
        type: 'string',
        length: 255
      },
      account_id: {
        type: 'string',
        length: 255,
      },
      total_endpoints_created: {
        type: 'int',
      },
      endpoints_active: {
        type: 'int',
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

exports.down = function(db, callback) {
  console.log('------------> Eliminando tabla \n\n')
  // db.dropTable('user_test', { ifExists: true }, (error) => {
  //   console.log('Error: ' , error)
  // })
  // // return callback();
  db.dropTable('user_test', callback);
};

exports._meta = {
  "version": 1
};
