const appkey = process.env.NCMB_APPLICATION_KEY;
const clientkey = process.env.NCMB_CLIENT_KEY;

var NCMB = require('ncmb');
var ncmb = new NCMB(appkey, clientkey);
var Transit = ncmb.DataStore("Transit");
Transit.fetchAll()
  .then(function (logs) {
    //console.log(JSON.stringify(logs));
    if (logs.length === 0) {
      return;
    }
    console.log(logs[0].total);
  })
  .catch(function (err) {
    console.error(err);
  });
