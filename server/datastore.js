'use strict';
const Datastore = require('@google-cloud/datastore');

const datastore = Datastore();
function insertVisit (visit) {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit
  });
}

function getVisits () {
  const query = datastore.createQuery('visit')
    .order('timestamp', { descending: true })
    .limit(10);

  return datastore.runQuery(query)
    .then((results) => {
      const entities = results[0];
      return entities.map((entity) => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`);
    });
}