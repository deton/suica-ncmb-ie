var appkey = localStorage.getItem("NCMB_APPKEY");
if (!appkey) {
  appkey = prompt("NCMB APP KEY", "");
  if (appkey) {
    localStorage.setItem("NCMB_APPKEY", appkey);
  }
}
var clientkey = localStorage.getItem("NCMB_CLIENTKEY");
if (!clientkey) {
  clientkey = prompt("NCMB CLIENT KEY", "");
  if (clientkey) {
    localStorage.setItem("NCMB_CLIENTKEY", clientkey);
  }
}
var ncmb = new NCMB(appkey, clientkey);
var Transit = ncmb.DataStore("Transit");
//function getds() {
  Transit.fetchAll()
    .then(function (logs) {
      console.log(JSON.stringify(logs));
      if (logs.length === 0) {
        return;
      }
      // XXX: system dependent
      document.frames['bodys'].document.forms[0].elements[21].value = logs[0].total;
      //document.frames['bodys'].document.activeElement.value = logs[0].total;
    })
    ["catch"](function (err) {
      console.error(err);
    });
//}
