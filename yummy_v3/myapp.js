var myApp = myApp || {};

myApp.photo_public_key = "ごちそう";
myApp.photo_data = [];
myApp.active_menu = [myApp.photo_public_key];

myApp.firstload = function() {
    chrome.storage.local.get('gochisoIndexs', function(e) {
        if (e.gochisoIndexs == undefined) {
            chrome.storage.local.set({'gochisoIndexs': []}, function() {
                myApp.load();
            });
        } else {
            document.getElementById("base_bar_text").innerHTML = myApp.photo_public_key;
            griddles.layout.menu_items = e.gochisoIndexs;
            myApp.load();
        }
    });
}

myApp.load = function(e) {
    // 写真読み込み
    chrome.storage.local.get('gochisoCode', function(e) {
        if (e.gochisoCode == undefined) {
            chrome.storage.local.set({'gochisoCode': []}, function() {
                myApp.pleaseWait();
            });
        } else {
            myApp.pleaseWait();
        }
    });

}

myApp.pleaseWait = function() {
    window.setTimeout(myApp.g, 1000);
}

myApp.changedSelectBox = function(e) {
    var val = e;
    myApp.g(val);
}

myApp.navOnClick = function(j) {
    var val = j.value;
    switch (val) {
        case "importing":
            myApp.importing();
            break;
        case "removing":
            myApp.deleting();
            break;
        case "getting":
            myApp.goWebStore();
            break;
        case "yummy":
            document.getElementById("base_bar_text").innerHTML = myApp.photo_public_key;
            myApp.g();
            break;
    }
}

myApp.cleanStream = function() {
    var n = document.getElementsByClassName("Stream").length;
    for (g = 0; g < n; g++) {
        d.getElementById("stream_" + g).innerHTML = "";
    }
}

// img::id: C+i ---- dataset.key---
// card:id: card_+(i-1)
myApp.g = function(q) {
    if (q == undefined || q == '') {
        q = myApp.photo_public_key;
    }
    chrome.storage.local.get('gochisoCode', function(s) {
        console.log(s.gochisoCode.length);
        if (s.gochisoCode.length != 0) {
            var aj = s.gochisoCode;
            var arr = arr || [];
            for (var u = 1; u < aj.length; u++) {
                var page = aj[u].page.replace(/\//gi, "__SLASH__");
                var keys = aj[u].tags.ys.toString();
                console.log(page);
                var regQ = new RegExp(q, "gi");
                var isQ = (keys.search(regQ) == -1) ? 0 : 1;
                if (isQ == 1) {
                    arr.push(griddles.card({"dataset": [["url", page], ["key", keys]],"id": "C" + u,"type": "default-img","init": aj[u].web,"card": false /*false"#fff"*/}));
                }
            }
            myApp.renderingCards(arr);
        }
    });
}


myApp.renderingCards = function(cards) {
    griddles.layout.cards = cards;
    griddles.render = true; /* important! */
    griddles.load();
}

myApp.importing = function() {
    console.log("func:importing");
    var arr = [];
    arr.push(griddles.card({"init": "<span style='font-size: 15pt'>インポート</span><br><br>拡張機能で出力されたごちそうカードの共有コードを入力してください。<center><textarea id='share_code' style='width: 97%; height: 100px'></textarea></center><br><button id='reg_btn' style='cursor:pointer'>登録</button>","wide": true,"paddings": [15, 15, 15, 15]}));
    arr.push(griddles.card({"init": "<span style='font-size: 15pt'>サンプルをインポート</span><br><br><button id='reg_btn_sample' style='cursor:pointer'>サンプルデータを登録</button>","wide": true,"paddings": [15, 15, 15, 15]}));
    myApp.renderingCards(arr);
}

myApp.deleting = function() {
    var arr = [];
    arr.push(griddles.card({"init": "<span style='font-size: 15pt'>削除</span><br><br>下のボタンを押すと、すべての登録データを消去します。この操作は取り消せません。<br><button id='rmv_btn' style='cursor:pointer'>消去</button>","wide": true,"paddings": [15, 15, 15, 15]}));
    myApp.renderingCards(arr);
}

myApp.goWebStore = function() {
    var url = "https://chrome.google.com/webstore/detail/%E3%81%94%E3%81%A1%E3%81%9D%E3%81%86%E3%82%AB%E3%83%BC%E3%83%89/kikhdipiobbjgdlcpdgbhhfljpoblcjg";
    griddles.openBrowserTab(url);
}

myApp.visitPage = function(j) {
    // # 写真をクリックされたときに実行する
    if ((j.id)[0] == "C") {
        var page = (j.dataset.url).replace(/__SLASH__/gi, "/");
        console.log(page);
        griddles.openBrowserTab(page);
    }
}

document.getElementById("base_bar_text").innerHTML = griddles.layout.menu_items[0];

window.addEventListener("load", myApp.firstload, false);

myApp.regPhoto = function(gochisoCode) {
    if (gochisoCode != "" && gochisoCode != null) {
        // ^.^
        var imported_indexs = [myApp.photo_public_key];
        var gochisoCode = JSON.parse(gochisoCode);
        var imported_indexs_str = "/" + myApp.photo_public_key + "/";
        for (var i = 1; i < gochisoCode.length; i++) {
            var data_json = gochisoCode[i];
            var idxs = data_json.tags.ys;
            for (j = 0; j < idxs.length; j++) {
                var idx = idxs[j];
                var q_idx = new RegExp(idx, "gi");
                var isReg = (imported_indexs_str.search(q_idx) == -1) ? 0 : 1;
                if (isReg == 0) {
                    // 新規登録必要
                    imported_indexs.push(idx);
                    imported_indexs_str = imported_indexs_str + idx + "/";
                } else {
                // 登録済み
                }
            }
        }
        //console.log(imported_indexs); /*^o^*/
        //console.log(imported_indexs_str); /*^o^*/
        chrome.storage.local.set({'gochisoIndexs': imported_indexs}, function() {
            document.getElementById("base_bar_text").innerHTML = myApp.photo_public_key;
            griddles.layout.menu_items = imported_indexs;
            
            chrome.storage.local.set({'gochisoCode': gochisoCode}, function() {
                myApp.g();
            });
        
        });
    // ^.^
    }
}

window.addEventListener("click", function(e) {
    if (e.target.id == "reg_btn") {
        var gochisoCode = document.getElementById("share_code").value;
        myApp.regPhoto(gochisoCode);
    } else if (e.target.id == "reg_btn_sample") {
        var gochisoCode = samples;
        for(var n = 0; n < gochisoCode.length; n++) {
          var obj = gochisoCode[n];
          if(obj.web != undefined) {
            var local_name = obj.page.split("/");
            local_name = local_name[local_name.length - 1];
            obj.web = "photos/"+ local_name +".jpg";
          }
        }
        gochisoCode = JSON.stringify(gochisoCode);
        myApp.regPhoto(gochisoCode);
    } else if (e.target.id == "rmv_btn") {
        chrome.storage.local.remove('gochisoCode', function() {});
        chrome.storage.local.remove('gochisoIndexs', function() {});
    }
}, false);


// 新機能を追加してみる
// 写真の上にマウスオーバーするとタグが表示される機能
