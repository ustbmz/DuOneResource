// var reg = new RegExp('a', 'ig');
// var reg = /1/g;

var str = '21365aBa462aca31453qa1231';

var newStr = str.replace(/[a-z]/gi, function (s) {
  return '<' + s + '>';
});
console.log(newStr);
