document.addEventListener('deviceready', function () {
    nfc.addTagDiscoveredListener(onNfc, function () {
            console.log("Listening for non-NDEF tags.");
        }, function onFail(e) {
            console.error(e);
        });
}, false);

function onNfc(nfcEvent) {
    var tag = nfcEvent.tag;
    console.log(JSON.stringify(nfcEvent.tag));

    cordova.plugins.SuicaReader.getHistory(10, function onSuccess(data) {
        console.log(JSON.stringify(data));
        var tbody = document.getElementById('tbody');
        // 現在表示されているデータを全削除
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        // 表示データを追加
        data.filter(function (elem) {
            return (elem.kind != '物販');
            // XXX: action == '運賃支払(改札出場)' のみにする?
        }).forEach(function (elem, i) {
            var tr = document.createElement('tr');
            // 選択用チェックボックス
            var tdinput = document.createElement('td');
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'hists';
            input.value = '' + i;
            input.dataset.hist = JSON.stringify(elem);
            //input.dataset.payment = -elem.payment;
            if (i < 2) { // 直近の2つを出張時の往復の履歴と想定して選択
                input.checked = true;
            }
            tdinput.appendChild(input);
            tr.appendChild(tdinput);

            // 履歴データ
            var td = document.createElement('td');
            var ul = document.createElement('ul');
            ul.appendChild(createLi(elem.year + '-' + elem.month + '-' + elem.day));
            ul.appendChild(createLi(elem.inStation + ' → ' + elem.outStation));
            ul.appendChild(createLi('支払: ' + (-elem.payment) + ' 円'));
            /*
            ul.appendChild(createLi('date:' + elem.year + '-' + elem.month + '-' + elem.day));
            ul.appendChild(createLi('inLine:' + elem.inLine));
            ul.appendChild(createLi('inStation:' + elem.inStation));
            ul.appendChild(createLi('outLine:' + elem.outLine));
            ul.appendChild(createLi('outStation:' + elem.outStation));
            ul.appendChild(createLi('kind:' + elem.kind));
            ul.appendChild(createLi('device:' + elem.device));
            ul.appendChild(createLi('action:' + elem.action));
            ul.appendChild(createLi('remain:' + elem.remain));
            ul.appendChild(createLi('seqNo:' + elem.seqNo));
            */
            td.appendChild(ul);
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        function createLi(text) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(text));
            return li;
        }
    }, function onError(e) {
        console.error(e);
    });
}

function sendNcmb() {
    var hists = [];
    var elems = document.histsform.hists;
    var total = 0;
    for (var i = 0, len = elems.length; i < len; i++) {
        if (elems[i].checked) {
            var h = JSON.parse(elems[i].dataset.hist);
            hists.push(h);
            total += -h.payment;
        }
    }
    console.log('total=' + total + ',' + JSON.stringify(hists));

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
    document.getElementById('sendstatus').innerHTML = '旧データ削除中…';
    Transit.fetchAll()
        .then(function (results) {
            return Promise.all(results.map(function (item) {
                return item.delete();
            }));
        })
        .then(function () {
            var data = new Transit();
            data.set("total", total);
            data.set("history", hists);
            document.getElementById('sendstatus').innerHTML = '送信中…';
            return data.save();
        })
        .then(function () {
            console.log('OK ncmb.save');
            document.getElementById('sendstatus').innerHTML = '送信成功';
        })
        .catch(function (err) {
            console.error('NG ncmb:' + err.toString());
            document.getElementById('sendstatus').innerHTML = '送信失敗';
        });
}
