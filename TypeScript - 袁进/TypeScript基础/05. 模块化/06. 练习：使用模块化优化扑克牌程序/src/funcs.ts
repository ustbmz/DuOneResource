import { Deck } from "./types";
import { Mark, Color } from "./enums";


export function createDeck(): Deck {
    const deck: Deck = [];
    const marks = Object.values(Mark)
    const colors = Object.values(Color)
    for (const m of marks) {
        for (const c of colors) {
            deck.push({
                color: c,
                mark: m
            })
        }
    }
    return deck;
}

export function printDeck(deck: Deck) {
    let result = "\n";
    deck.forEach((card, i) => {
        let str = card.color + card.mark;
        result += str + "\t";
        if ((i + 1) % 6 === 0) {
            result += "\n";
        }
    })
    console.log(result);
}