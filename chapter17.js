
// Chapter 17. we Change, Therefore We Are!

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

function make_deep_M_p128() {
  let Ns = null;
  let Rs = null;
  const D = function(m) {
    return isZero(m)
      ? 'pizza'
      : cons(deep_M(sub1(m)), null);
  }
  return function(n) {
    let exists = find(n, Ns, Rs);
    if (isAtom(exists)) {
      let result = D(n);
      Rs = cons(result, Rs);
      Ns = cons(n, Ns);
      return result;
    } else {
      return exists;
    }
  }
}

function make_deep_M_p130() {
  let Ns = null;
  let Rs = null;
  return function(n) {
    let exists = find(n, Ns, Rs);
    if (isAtom(exists)) {
      let result = isZero(n)
	  ? 'pizza'
	  : cons(deep_M(sub1(n)));
      Rs = cons(result, Rs);
      Ns = cons(n, Ns);
      return result;
    } else {
      return exists;
    }
  }
}

function make_deep_M() { // p. 136
  let Ns = null;
  let Rs = null;
  return function(n) {
    let exists = find(n, Ns, Rs);
    if (isAtom(exists)) {
      let result = isZero(n)
	  ? 'pizza'
	  : consC(deep_M(sub1(n))); // consC replaces cons
      Rs = cons(result, Rs);
      Ns = cons(n, Ns);
      return result;
    } else {
      return exists;
    }
  }
}

const deep_M = make_deep_M();

let counter;
let set_counter;

function make_consC() {
  let N = 0;
  counter = function() { return N };
  set_counter = function(x) { N = x; };
  return function(x, y) {
    N = add1(N);
    return cons(x, y);
  }
}
const consC = make_consC();

 function deep(m) {
  return isZero(m)
    ? 'pizza'
    : consC(deep(sub1(m)), null);
}

function supercounter(f) {
  const S = function(n) {
    if (isZero(n)) {
      f(n);
    } else {
      f(n);
      S(sub1(n));
    }
  }
  S(1000);
  return counter();
}

function rember1starC(a, ls) {
  let R = function(l) {
    if (isNull(l)) {
      throw "no";
    } else if (isAtom(car(l))) {
      if (isEq(car(l), a)) {
	return cdr(l)
      } else {
	return consC(car(l), R(cdr(l)));    // consC
      }
    } else { // car(l) is a list
      let new_car;
      try {
	new_car = R(car(l));
      } catch(oh2) {
        return consC(car(l), R(cdr(l)))   // consC
      }
      return consC(new_car, cdr(l));    // consC
    }
  }
  let new_l;
  try {
    new_l = R(ls);
  } catch(oh) {
    return ls;
  }
  return new_l;
}

function rember1starC2(a, l) {
  let R;
  R = function(l) {
    if (isNull(l)) return null;
    else if (isAtom(car(l))) {
      if (isEq(car(l), a)) return cdr(l);
      else return consC(car(l), R(cdr(l)));
    } else {
      let av = R(car(l));
      if (isEqlist(car(l), av)) return consC(car(l), R(cdr(l)));
      else return consC(av, cdr(l));
    }
  }
  return R(l);
}
