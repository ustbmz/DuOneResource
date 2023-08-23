type Deck = NormalCard[]
type Color = "♥" | "♠" | "♦" | "♣";
type NormalCard = {
    color: Color
    mark: number
}

function createDeck(): Deck {
    const deck: Deck = [];
    for (let i = 1; i <= 13; i++) {
        deck.push({
            mark: i,
            color: "♠"
        })
        deck.push({
            mark: i,
            color: "♣"
        })
        deck.push({
            mark: i,
            color: "♥"
        })
        deck.push({
            mark: i,
            color: "♦"
        })
    }
    return deck;
}

function printDeck(deck: Deck) {
    let result = "\n";
    deck.forEach((card, i) => {
        let str = card.color;
        if (card.mark <= 10) {
            str += card.mark;
        }
        else if (card.mark === 11) {
            str += "J";
        }
        else if (card.mark === 12) {
            str += "Q";
        }
        else {
            str += "K";
        }
        result += str + "\t";
        if ((i + 1) % 6 === 0) {
            result += "\n";
        }
    })
    console.log(result);
}

const deck = createDeck();
printDeck(deck);