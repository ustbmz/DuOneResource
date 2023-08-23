import { Deck } from "./deck";

const deck = new Deck();
deck.shuffle();
console.log("=========洗牌之后=======")
deck.print();
const result = deck.publish();
console.log("=========发牌之后=======")

console.log("===========玩家1========")
result.player1.print();

console.log("===========玩家2========")
result.player2.print();

console.log("===========玩家3========")
result.player3.print();

console.log("===========桌面========")
result.left.print();