import { GameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {
    onGamePause(): void {
        this.msgDom.css({
            display: "flex"
        })
        this.msgDom.find("p").html("游戏暂停");
    }
    onGameStart(): void {
        this.msgDom.hide();
    }
    onGameOver(): void {
        this.msgDom.css({
            display: "flex"
        })
        this.msgDom.find("p").html("游戏结束");
    }
    showScore(score: number): void {
        this.scoreDom.html(score.toString());
    }
    private nextDom = $("#next");
    private panelDom = $("#panel");
    private scoreDom = $("#score");
    private msgDom = $("#msg");

    init(game: Game): void {
        //1. 设置宽高
        this.panelDom.css({
            width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
        })
        this.nextDom.css({
            width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
        })

        //2. 注册键盘事件
        $(document).keydown((e) => {
            if (e.keyCode === 37) {
                game.controlLeft();
            }
            else if (e.keyCode === 38) {
                game.controlRotate();
            }
            else if (e.keyCode === 39) {
                game.controlRight();
            }
            else if (e.keyCode === 40) {
                game.controlDown();
            }
            else if (e.keyCode === 32) {
                if (game.gameStatus === GameStatus.playing) {
                    game.pause();
                }
                else {
                    game.start();
                }
            }
        })
    }

    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom);
        })
    }

    swtich(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, this.panelDom);
        })
    }
}