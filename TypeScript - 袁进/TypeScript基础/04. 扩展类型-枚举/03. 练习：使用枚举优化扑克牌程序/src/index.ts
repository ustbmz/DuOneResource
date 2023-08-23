type Deck = NormalCard[]
enum Color {
    heart = "♥",
    spade = "♠",
    club = "♣",
    diamond = "♦"
}

enum Mark {
    A = "A",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
    six = "6",
    seven = "7",
    eight = "8",
    nine = "9",
    ten = "10",
    eleven = "J",
    twelve = "Q",
    king = "K"
}

type NormalCard = {
    color: Color
    mark: Mark
}

function createDeck(): Deck {
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

function printDeck(deck: Deck) {
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

const deck = createDeck();
printDeck(deck);