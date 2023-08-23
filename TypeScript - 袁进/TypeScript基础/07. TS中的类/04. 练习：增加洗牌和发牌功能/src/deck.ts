import { Card, Joker } from "./types";
import { Mark, Color } from "./enums";

interface PublishResult {
    player1: Deck,
    player2: Deck,
    player3: Deck,
    left: Deck
}

export class Deck {
    private cards: Card[] = [];

    constructor(cards?: Card[]) {
        if (cards) {
            this.cards = cards;
        }
        else {
            this.init();
        }
    }

    private init() {
        const marks = Object.values(Mark)
        const colors = Object.values(Color)
        for (const m of marks) {
            for (const c of colors) {
                this.cards.push({
                    color: c,
                    mark: m,
                    getString() {
                        return this.color + this.mark;
                    }
                } as Card)
            }
        }
        let joker: Joker = {
            type: "small",
            getString() {
                return "jo";
            }
        }
        this.cards.push(joker)
        joker = {
            type: "big",
            getString() {
                return "JO"
            }
        }
        this.cards.push(joker);
    }

    print() {
        let result = "\n";
        this.cards.forEach((card, i) => {
            result += card.getString() + "\t";
            if ((i + 1) % 6 === 0) {
                result += "\n";
            }
        })
        console.log(result);
    }

    /**
     * 洗牌
     */
    shuffle() {
        // [x1,x2,x3,x4,x5,x6,x7]
        for (let i = 0; i < this.cards.length; i++) {
            const targetIndex = this.getRandom(0, this.cards.length);
            const temp = this.cards[i];
            this.cards[i] = this.cards[targetIndex];
            this.cards[targetIndex] = temp;
        }
    }

    //发完牌后，得到的结果有4个card[]
    publish(): PublishResult {
        let player1: Deck, player2: Deck, player3: Deck, left: Deck;
        player1 = this.takeCards(17);
        player2 = this.takeCards(17);
        player3 = this.takeCards(17);
        left = new Deck(this.cards);

        return {
            player1,
            player2,
            player3,
            left
        };
    }

    private takeCards(n: number): Deck {
        const cards: Card[] = [];
        for (let i = 0; i < n; i++) {
            cards.push(this.cards.shift() as Card);
        }
        return new Deck(cards);
    }

    /**
     * 无法取到最大值
     * @param min 
     * @param max 
     */
    private getRandom(min: number, max: number) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }
}