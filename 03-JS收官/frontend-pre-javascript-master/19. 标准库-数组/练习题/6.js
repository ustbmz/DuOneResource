// 进一步完善下面的扑克牌程序
// 给牌堆添加一个shuffle方法，该方法可以打乱牌堆中扑克牌的顺序

/**
 * 创建一张扑克牌
 * @param {number} number 1-1, ..., 11-J，12-Q，13-K，14-小王，15-大王
 * @param {number} color 1-黑桃  2-红桃  3-梅花  4-方片
 */
function Poker(number, color) {
  this.number = number;
  this.color = color;
}

Poker.prototype.print = function () {
  if (this.number === 14) {
    console.log('joker');
    return;
  }
  if (this.number === 15) {
    console.log('JOKER');
    return;
  }
  // 其他情况
  // 得到花色
  var colors = ['♠', '♥', '♣', '♦'];
  var color = colors[this.color - 1];
  // 点数
  var numbers = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  var number = numbers[this.number - 1];

  console.log(color + number);
};

/*
  一碟扑克牌
*/
function Deck() {
  this.pokers = [];
  for (var i = 1; i <= 13; i++) {
    for (var j = 1; j <= 4; j++) {
      this.pokers.push(new Poker(i, j));
    }
  }
  this.pokers.push(new Poker(14, 0));
  this.pokers.push(new Poker(15, 0));
}

Deck.prototype.print = function () {
  for (var i = 0; i < this.pokers.length; i++) {
    this.pokers[i].print();
  }
};

/**
 * 洗牌，打乱牌堆中的扑克牌顺序
 */
Deck.prototype.shuffle = function () {};
