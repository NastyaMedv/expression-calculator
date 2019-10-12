function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {    // write your solution here

  expr = expr.split(' ').join('');      //removing spacebars

  if (expr.indexOf('/0')!=-1)           // division by zero check
    throw new SyntaxError('TypeError: Division by zero.');

  function check(str) {                 // brackets check
    let stek = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] == '(')
        stek[stek.length] = str[i];
        else if (str[i] == ')')
          if (stek[stek.length-1] == '(')
            stek.length = stek.length - 1;
            else stek[stek.length] = str[i];
    }
    return (stek.length <= 0) ? true : false;
  }

  if (!check(expr))
    throw new SyntaxError('ExpressionError: Brackets must be paired');

  function count(a,b,c) {             // counting function for all operations
    switch (c) {
      case '+': return (+a+b);
      case '-': return (a-b);
      case '*': return (a*b);
      case '/': return (a/b);
      default: return null; break;
    }
  }

  function isFirst(str) {           // check for first operations * and /
    return ((str=='*')||(str=='/')) ? true : false;
  }

  function isSecond(str) {           // check for second operations + and -
    return ((str=='+')||(str=='-')) ? true : false;
  }

  function findRight(str) {         // searching right number
    let i = 0;
    while ((!isFirst(str[i]))&&(!isSecond(str[i]))) {
      i++;
      if (i == str.length) break;
    }
    return i;
  }

  function findLeft(str) {        // searching left number
    let i = str.length - 1;
    while ((!isFirst(str[i]))&&(!isSecond(str[i]))) {
      i--;
      if (i == -1) break;
    }
    return str.length - i - 1;
  }

  function calculation(expr) {
    let i = 0;

    while (i<expr.length) {
      if (isFirst(expr[i])) {
        let numberA = findLeft(expr.substring(0,i));
        let numberB = findRight(expr.substring(i+1));
        let result = count(+expr.substr(i-numberA,numberA),+expr.substr(i+1,numberB),expr[i]);
        expr = expr.substring(0,i-numberA) + result + expr.substring(i+numberB+1);
        i-= numberA;
//console.log(expr);
      } else {
        i++;
      }
    }

    i = (expr[0]=='-') ? 1 : 0;

    while (i<expr.length) {
      if (isSecond(expr[i])) {
        let numberA = expr.substring(0,i);
        let numberB = findRight(expr.substring(i+1));
        let result = count(numberA,+expr.substr(i+1,numberB),expr[i]);
        expr = result + expr.substring(i+numberB+1);
        i = (expr[0]=='-') ? 1 : 0;
//console.log(expr);
      } else {
        i++;
      }
    }

    return expr;
  }

  return +calculation(expr);

}

module.exports = {
    expressionCalculator
}
