'use strict';

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
  db.addForeignKey('users', 'accounts', 'account_id_fk', {'account_id': 'id'}, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
