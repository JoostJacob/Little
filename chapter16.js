
// Chapter 16. Ready, Set, Bang!

function sweet_tooth(food) {
  return cons(food, (cons('cake', null)));
}

let last = 'angelfood';

function sweet_tooth_L(food) {
  last = food;
  return cons(food, (cons('cake', null)));
}

let ingredients = null;

function sweet_tooth_R(food) {
  ingredients = cons(food, ingredients);
  return cons(food, (cons('cake', null)));
}

function deep_p110(m) {
  return isZero(m)
    ? 'pizza'
    : cons(deep_p110(sub1(m)), null);
}

let Ns = null;
let Rs = null;

function deep_R(n) {
  Ns = cons(n, Ns);
  let result = deep_p110(n);
  Rs = cons(result, Rs);
  return result;
}

function my_find(n, Ns, Rs) {
  return (n === car(Ns))
    ? car(Rs)
    : my_find(n, cdr(Ns), cdr(Rs));
}

function find(n, Ns, Rs) {
  let A = function(ns, rs) { // for the 12th Commandment
    return isNull(ns)
      ? false
      : (n === car(ns))
      ? car(rs)
      : A(cdr(ns), cdr(rs));
  }
  return A(Ns, Rs);
}

function deep_M_p114(n) {
  if (isMember(n, Ns)) {
    return find(n, Ns, Rs);
  } else {
    let result = deep(n);
    Rs = cons(result, Rs);
    Ns = cons(n, Ns);
    return result;
  }
}

// like in Chapter 15 use outer function to provide closure
function make_deep_M_p116() {
  let Ns = null; // if you just add these 2 lines to deep_M_p114
  let Rs = null; // they are not 'remembered' but = null at every call
  return function(n) { // would still work but less efficient
    if (isMember(n, Ns)) {
      return find(n, Ns, Rs);
    } else {
      let result = deep(n);
      Rs = cons(result, Rs);
      Ns = cons(n, Ns);
      return result;
    }
  }
}
const deep_M_p116 = make_deep_M_p116();

function make_deep_M() {
  let Ns = null;
  let Rs = null;
  return function(n) {
    let exists = find(n, Ns, Rs);
    if (isAtom(exists)) {
      let result = deep(n);
      Rs = cons(result, Rs);
      Ns = cons(n, Ns);
      return result;
    } else {
      return exists;
    }
  }
}
const deep_M = make_deep_M();

function deep(m) {
  return isZero(m)
    ? 'pizza'
    : cons(deep_M(sub1(m)), null);
}

/*
  Take a deep breath or a deep pizza, now.
*/

function make_length_p119() { // outer function if let before lambda in scheme
  let h = () => 0;
  h = function (l) {
    return isNull(l)
      ? 0
      : add1(h(cdr(l)))
  }
  return h;
}
const length_p119 = make_length_p119();

function L(length) { // p.121
  return function(l) {
    return isNull(l)
      ? 0
      : add1(length(cdr(l)));
  }
}

function make_length_p122() {
  let h = () => 0;
  h = L((arg) => h(arg));
  return h;
}
const length_p122 = make_length_p122();

function Y_1(L) { // p.123
  let h = (l) => null;
  h = L((arg) => h(arg));
  return h;
}

function Y_bang(f) {
  let h = f((arg) => h(arg));
  return h;
}

const length = Y_bang(L);

//console.log(length(str2sx("(1 2 3 4)")));

function D(depth_star) {
  return function(s) {
    return isNull(s)
      ? 1
      : isAtom(car(s))
      ? depth_star(cdr(s))
      : Math.max(add1(depth_star(car(s))),
		 depth_star(cdr(s)))
  }
}
const depth_star = Y_bang(D);

function make_biz() {
  let x = 0;
  return function(f) {
    x = add1(x);
    return function(a) {
      return (isEq(a, x))
	? 0
	: f(a);
    }
  }
}
const biz = make_biz();    

function Y(le) { // Javascript arrow function version
  return ((f) => f(f))((f) => le((x) => f(f)(x)));
}

// Y(biz)(5); // => 0
// Y_bang(biz)(5); // => Maximum call stack size exceeded (node.js)
