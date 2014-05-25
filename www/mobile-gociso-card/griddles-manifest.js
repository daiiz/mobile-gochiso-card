/**
 * Griddles v0.0.34b
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */

var griddles = griddles || {};

 /* User settings */
griddles.msgLoading = "+griddles";

/* flags */
griddles.xhrimg = false;
griddles.cca = false;

griddles.layout = {
    "page_title": "griddles",
    "page_icon": "icon.png",
    "page_bar_color": "#ffffff",         //New!
    "page_bar_bg_color": "#312319",      //New!
    "background_color": /*"#F1F1F1"*/"#e5e5e5",
    "card_width_px": 280,
    "card_height_px": "auto",         // OR INT Number
    "card_paddings": [3, 3, 3, 3],    //New!
    "card_margin_bottom": 18,
    "stream_margin_left_px": 9,
    "stream_margin_right_px": 9,
    "available_width_percent": 100,
    "max_streams_limit": 4,       //New!
    "card_tooltip": false,            //Changed! true OR false
    "load_limit": 2,
    "clear": false,
    "cards": [
    ]
};

griddles.layout.cardOnClick = function(j) {
    console.log(j);
    myApp.visitPage(j);
}

var restart_time = 1;
griddles.layout.scrollEnd = function() {
   return false;
}

