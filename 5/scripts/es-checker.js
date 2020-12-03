

function checkES6Support() {
    function checkClass() {
        return checkExpression('class SomeClass {}');
    }
    
    function checkArrowFunction() {
        return checkExpression('var f = x => 0');
    }
    
    function checkLet() {
        return checkExpression('let x = 0');
    }
    
    function checkConst() {
        return checkExpression('const x = 0');
    }
    
    function checkPromises() {
        return typeof Promise !== 'undefined';
    }
    
    function checkTemplateString() {
        return checkExpression('var a = `a`');
    }
    
    function checkSpread() {
        return checkExpression('Math.max(...[ 0, 10 ])');
    }
    
    function checkAsyncFunction() {
        return checkExpression('async function fn () {}');
    }
    
    /**
     * Checks if a given JS expression can be excecuted using the eval function
     * @param {string} statement 
     */
    function checkExpression(statement) {
      try {
        eval(statement)
        return true
      } catch (err) {
        return false
      }
    }

    return checkClass() && checkArrowFunction() && checkConst() && checkLet() && checkPromises()
        && checkTemplateString() && checkSpread() && checkAsyncFunction();
}

