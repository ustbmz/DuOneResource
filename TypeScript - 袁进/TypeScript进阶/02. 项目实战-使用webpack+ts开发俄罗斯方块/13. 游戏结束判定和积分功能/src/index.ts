import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from "jquery"
var g = new Game(new GamePageViewer());

$("#btnStart").click(function(){
    g.start();
})

$("#btnPause").click(function(){
    g.pause();
})

$("#btnLeft").click(function(){
    g.controlLeft();
})

$("#btnRight").click(function(){
    g.controlRight();
})

$("#btnDown").click(function(){
    g.controlDown();
})

$("#btnRotate").click(function(){
    g.controlRotate();
})