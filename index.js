const db   = require('sqlite');
const P    = require('bluebird');
const data = require('./yarndocs');

const location = __dirname + '/yarn.docset/Contents/Resources/docSet.dsidx';

const createTable = 'CREATE TABLE searchIndex(id INTEGER PRIMARY KEY, name TEXT, type TEXT, path TEXT)';
const createIndex = 'CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path)';

const addRow = (name, onlinePath) => {
  const onlinePathParts = onlinePath
                          .replace('https://yarnpkg.com/en/docs', '')
                          .split('#');
const localPath = [onlinePathParts[0], '/index.html#', onlinePathParts[1]].join('');
  return `
    INSERT OR IGNORE INTO searchIndex(name, type, path)
    VALUES (${JSON.stringify(name)}, 'Command', ${JSON.stringify(localPath)})
    `
}

return P.resolve(db.open(location))
  .then(() => db.all('DROP TABLE IF EXISTS searchIndex'))
  .then(() => db.all(createTable))
  .then(() => db.all(createIndex))
  .then(() => P.map(data, ({ name, path }) => db.all(addRow(name, path))));
