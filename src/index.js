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



  return 0;

}

module.exports = {
    expressionCalculator
}
