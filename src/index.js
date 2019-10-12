function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {    // write your solution here

  //removing spacebars
  expr = expr.split(' ').join('');


  // division by zero check
  if (expr.indexOf('/0')!=-1)
    throw new SyntaxError('TypeError: Division by zero.');


  // brackets check
  function isOpen(s) {
    return (s == '(') ? true : false;
  }

  function isClosed(s) {
    return (s == ')') ? true : false;
  }

  function check(str) {
    let stek = [];
    for (let i = 0; i < str.length; i++) {
      if (isOpen(str[i]))
        stek[stek.length] = str[i];
        else if (isClosed(str[i]))
          if (isOpen(stek[stek.length-1]))
            stek.length--;
            else stek[stek.length] = str[i];
    }
    return (stek.length <= 0) ? true : false;
  }

  if (!check(expr))
    throw new SyntaxError('ExpressionError: Brackets must be paired');



  // counting function for all operations
  function count(a,b,c) {
    switch (c) {
      case '+': return (+a+b);
      case '-': return (a-b);
      case '*': return (a*b);
      case '/': return (a/b);
      default: return null; break;
    }
  }



  // check for first operations * and /
  function isFirst(str) {
    return ((str=='*')||(str=='/')) ? true : false;
  }

  // check for second operations + and -
  function isSecond(str) {
    return ((str=='+')||(str=='-')) ? true : false;
  }

  // searching number right from sing
  function findRight(str) {
    let i = 0;
    while ((!isFirst(str[i]))&&(!isSecond(str[i]))) {
      i++;
      if (i == str.length) break;
    }
    return i;
  }

  // searching number left from sign
  function findLeft(str) {        // searching left number
    let i = str.length - 1;
    while ((!isFirst(str[i]))&&(!isSecond(str[i]))) {
      i--;
      if (i == -1) break;
    }
    return str.length - i - 1;
  }


  // searching for end of current brackets
  function findBacketEnd(str) {
    let stek = 1, i =1;
    for (i = 1; i < str.length; i++) {
      if (isOpen(str[i]))  { stek++; }
        else { if (isClosed(str[i])) stek--; }
      if (stek == 0) break;
    }
    return i+1;
  }


  // handling /- , *- , +-  and -- exceptions
  function plusMinus(s) {
    if (s == '+') return '-';
      else return '+';
  }
  function moveMinus(str,index) {
    for (let i=str.length-1; i>=0; i--) {
      if (isSecond(str[i])) {
        return str.substring(0,i) + plusMinus(str[i]) + str.substring(i+1);
      }
    }
    return '-' + str;
  }



  //main calculation function
  function calculation(expr) {
//console.log(expr)
    let i = 0;                        // dealing with brackets

    while (i<expr.length) {
      if (isOpen(expr[i])) {
//console.log('((  ')
        let end = findBacketEnd(expr.substring(i));
        let result = calculation(expr.substr(i+1,end-2));
        let exprStart = expr.substring(0,i);
        if (result[0] == '-') {
          exprStart = moveMinus(exprStart,i);
          result = result.slice(1);
        }
        expr = exprStart + result + expr.substring(i+end);

//console.log('))  ')
      } else {
        i++;
      }
    }


    i = 0;                            // calculating * and / operations

    while (i<expr.length) {
      if (isFirst(expr[i])) {
        let numberA = findLeft(expr.substring(0,i));
        let numberB = findRight(expr.substring(i+1));
        let result = count(+expr.substr(i-numberA,numberA),+expr.substr(i+1,numberB),expr[i]);
        expr = expr.substring(0,i-numberA) + result + expr.substring(i+numberB+1);
        i-= numberA;
//console.log('*  ',expr);
      } else {
        i++;
      }
    }


    i = (expr[0]=='-') ? 1 : 0;     // calculating + and - operations

    while (i<expr.length) {
      if (isSecond(expr[i])) {
        let numberA = expr.substring(0,i);
        let numberB = findRight(expr.substring(i+1));
        let result = count(numberA,+expr.substr(i+1,numberB),expr[i]);
        expr = result + expr.substring(i+numberB+1);
        i = (expr[0]=='-') ? 1 : 0;
//console.log('+  ',expr);
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
