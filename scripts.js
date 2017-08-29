// Write three binary functions, add, sub, and mul, that take two numbers and return their sum, difference, and product.
// add(3, 4) --> 7
// sub(3, 4) --> -1
// mul(3, 4) --> 12

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

//********************** BINARY FUNCTION / TWO INVOCATIONS **********************

// Write a function liftf that takes a binary function , and makes it callable with two invocations
// var addf = liftf(add);
// addf(3)(4) --> 7

function liftf(binary) {
  return function(first) {
    return function(second) {
      return binary(first, second);
    };
  };
}

//****************************** CURRYING FUNCTION ******************************
// Write a function curry that takes in a binary function & returns a function that can take a second argument.


function curry(binary, first) {
  return function(second) {
    return binary(first, second);
  };
}
// var add3 = curry(add, 3);
// add3(4) --> 7


//*************************** TWICE FUNCTION / DOUBLE **********************************

// Write a function TWICE that takes a binary function & returns a unary function that passes its argument to the binary function twice.

function twice(binary) {
  return function(a) {
    return binary(a, a)
  }
}
//add(11, 11) // 22
var doubl = twice(add);
doubl(11) // 22

var square = twice(mul)
console.log(square(11)); //121



//*******************************************************************************
// Write a function exp that evaluates simple array expressions.
function exp(value) {            // takes first array and takes next 2 as arguments
  return (Array.isArray(value)) ? value[0](value[1], value[2]) : value;
}

var sae = [mul, 5, 11];
console.log(exp(sae)); // 55
console.log(exp(42)); // 42

//******************** Recursion: a function call itself ***********************
// Modify exp to evaluate nested array expressions.

function exp(value) {
  return (Array.isArray(value)) ? value[0](exp(value[1]), exp(value[2])) : value;
}

var nae = [Math.sqrt, [add, [square, 3], [square, 4]]];
console.log(exp(nae)); //5

//*********************** Retursion: a function returns itself ****************
// Write a function addg that adds from many invocations, until it sees an empty invocation.
function addg(first) {
  function more(next) {
    if (next === undefined) {
      return first
    }
    first += next;
    return more; // return itself
  }
  if (first !== undefined) {
    return more; //return itself
  }
}

console.log(addg()); //undefined
console.log(addg(2)()); //2
console.log(addg(2)(7)()); //9
console.log(addg(3)(0)(4)()); //7
console.log(addg(1)(2)(4)(8)()); //15

//************************************************************
// Write a funciton liftg that will take a binary function & apply it to many invocations.
function liftg(binary) {
  return function(first) {
    if (first === undefined) {
      return first;
    }
    return function more(next) {
      if (next === undefined) {
        return first;
      }
      first = binary(first, next);
      return more;
    };
  };
}

console.log(liftg(mul)()); // undefined
console.log(liftg(mul)(3)()); // 3
console.log(liftg(mul)(3)(0)(4)()); // 0
console.log(liftg(mul)(1)(2)(4)(8)()); // 64

//*******************************************************
//Write a function arrayg that will build an array from many invocations

// function arrayg(first) {
//   var array = [];
//   function more(next) {
//     if (next === undefined) {
//       return array;
//     }
//     array.push(next);
//     return more;
//   }
//   return more(first);
// }

//or

function arrayg(first) {
  if (first === undefined) {
    return [];
  }
  return liftg(function(array, value) {
    array.push(value);
    return array;
  })([first]);
}

console.log(arrayg()); //[]
console.log(arrayg(3)()); //[3]
console.log(arrayg(3)(4)(5)()); //[3,4,5]

//****************************************************
// Make a function continuize that takes a unary function, and returns a function that takes a callback and an argument.
function continuize(unary) {
  return function(callback, arg) {
    return callback(unary(arg));
  };
}

// ES6
// function continuize(any) {
//   return function(callback, ...x) {
//     return callback(any(...x));
//   };
// }

sqrtc = continuize(Math.sqrt);
console.log(sqrtc(alert, 81)); //9
