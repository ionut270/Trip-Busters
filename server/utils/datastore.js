const Datastore = require('@google-cloud/datastore');

// -------------- block of example code --------------
function newUser(user) {
  return datastore.save({ key: datastore.key(user), data: user });
}
function getUser(key) {
  const query = datastore.createQuery(user).order('timestamp', { descending: true }).limit(10);
  return datastore.runQuery(query).then((results) => {
      const entities = results[0];
      return entities.map((entity) => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`);
  });
}
//=============== block of example code ===============