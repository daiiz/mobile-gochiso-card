var myApp = myApp || {};

myApp.load = function(e) {
 chrome.storage.local.get('gochisoCode', function(e) {
    if(e.gochisoCode == undefined) {
        chrome.storage.local.set({'gochisoCode':[]}, function() {
             myApp.pleaseWait();
        });
    }else {
       myApp.pleaseWait();
    }
 });
 
}

myApp.pleaseWait = function() {
    window.setTimeout(myApp.g, 1000);
}

myApp.changedSelectBox = function(e) {
   var val = e;
   switch (val) {
      case "インポート" : myApp.importing();break;
      case "ごちそうカード" : myApp.g();break;
      case "削除" : myApp.deleting();break;
      case "拡張機能を入手": myApp.goWebStore();break;
   }
}

myApp.cleanStream = function(){
    var n = document.getElementsByClassName("Stream").length;
    for (g = 0; g < n; g++) {
        d.getElementById("stream_" + g).innerHTML = "";
    }
}


myApp.g = function() {
   chrome.storage.local.get('gochisoCode', function(s) {
      console.log(s.gochisoCode.length);
      if(s.gochisoCode.length != 0) {
           var aj = s.gochisoCode;
           var arr = arr || [];
               for(var u = 1; u < aj.length; u++) {
                   var page = aj[u].page.replace(/\//gi, "__SLASH__");
                   console.log(page);
                   arr.push(griddles.card({"dataset": [["url", page]], "id": "C"+u, "type": "default-img", "init": aj[u].web, "card": "#fff"}));
               }
           myApp.renderingCards(arr); 
      }
   });
}


myApp.renderingCards = function(cards) {
   griddles.layout.cards = cards;
   griddles.render = true;  /* important! */
   griddles.load();
}

myApp.importing = function() {
   console.log("func:importing");
   var arr = [];
   arr.push(griddles.card({"init": "<span style='font-size: 15pt'>インポート</span><br><br>拡張機能で出力されたごちそうカードの共有コードを入力してください。<center><textarea id='share_code' style='width: 97%; height: 100px'></textarea></center><br><button id='reg_btn' style='cursor:pointer'>登録</button>", "wide": true, "paddings": [15,15,15,15]}));
   myApp.renderingCards(arr);
}

myApp.deleting = function() {
  var arr = [];
  arr.push(griddles.card({"init": "<span style='font-size: 15pt'>削除</span><br><br>下のボタンを押すと、すべての登録データを消去します。この操作は取り消せません。<br><button id='rmv_btn' style='cursor:pointer'>消去</button>", "wide": true, "paddings": [15,15,15,15]}));
  myApp.renderingCards(arr);
}

myApp.goWebStore = function() {
    var url = "https://chrome.google.com/webstore/detail/%E3%81%94%E3%81%A1%E3%81%9D%E3%81%86%E3%82%AB%E3%83%BC%E3%83%89/kikhdipiobbjgdlcpdgbhhfljpoblcjg";
    //myApp.settingSelectBox(["ごちそう", "インポート", "削除", "拡張機能を入手"]);
    griddles.openBrowserTab(url);
}

myApp.visitPage = function(j) {
// # 写真をクリックされたときに実行する
  if((j.id)[0] == "C") {
       var page = (j.dataset.url).replace(/__SLASH__/gi, "/");
       console.log(page);
       griddles.openBrowserTab(page);
  }
}

document.getElementById("base_bar_text").innerHTML = griddles.layout.menu_items[0];
window.addEventListener("load", myApp.load, false);
window.addEventListener("click", function(e) {
   if(e.target.id == "reg_btn") {
       var gochisoCode = document.getElementById("share_code").value;
       if(gochisoCode != "" && gochisoCode != null) {
           chrome.storage.local.set({'gochisoCode': JSON.parse(gochisoCode)}, function() {
               myApp.g();
           });
       }
   }else if(e.target.id == "rmv_btn") {
      chrome.storage.local.remove('gochisoCode', function() {
         
      });
   }
}, false);

