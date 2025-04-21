// Chapter 15 The Difference Between Men and Boys ...

var x = cons('chicago', cons('pizza', null));
x = 'gone';
x = 'skin';

function gourmet(food) {
    return cons(food, cons(x, null));
}

x = 'rings';

function gourmand(food) {
    x = food;
    return cons(food, cons(x, null));
}

function dinerR(food) {
    x = food;
    return cons('milkshake', cons(food, null));
}

function make_o() { // use outer function giving closure over x
  let x = 'minestrone';
  return function(food) {
    x = food;
    return cons(food, cons(x, null));
  };
}
const omnivore = make_o();

// solution with Immediately Invoked Function Expression (IIFE)
const omnivore_2 = (function() {
    let x = 'minestrone';
    return function(food) {
x = food;
return cons(food, cons(x, null));
    };
})();

// Of course there are several class based solutions possible in Javascript.
// We try to stay close to the Little Schemer ways.

const gobbler = make_o();  // gobbler and omnivore have their own x

function nibbler(food) {
    let x = 'donut'; // this x is not "remembered"
    x = food;        // but resets to 'donut' at every call
    return cons(food, cons(x, null));
}    

var food = null;

function glutton(x) {
    food = x;
    return cons('more', cons(x, cons('more', cons(x, null))));
}

function chez_nous() {
    let a = x;
    x = food;
    food = a;
}
