
function Ychapter10 (le) {
  return function (f) {
    return f(f);
  }(function (f) {
      return le(function (x) {
        return f(f)(x);});});
}

function Y(le) { // Javascript arrow function version
  return ((f) => f(f))((f) => le((x) => f(f)(x)));
}

function multirember (a, lat) {
  return Y(function (mr) {
    return function (lat) {
      return isNull(lat)
      ? null
      : isEq(car(lat), a)
      ? mr(cdr(lat))
      : cons(car(lat), mr(cdr(lat)));
    };
  })(lat);
}

// return sx2str(multirember(2, str2sx("(1 2 3 2 4 2 5)")));

// 
// In Scheme one could implement letrec using let and set!
// (letrec ((f (lambda ...))) ...) is equivalent to the following:
// (let ((f <undefined>)) (set! f (lambda ...)) ...)
function let_multirember(a, lat) {  // p.22 Seasoned Schemer
  let mr; 
  // Note that if you have several variables calling each other you 
  // have to declare (let) them all before you define them
  mr = (lat) => (isNull(lat)) // or use mr = function (lat) { return ...; }
    ? null
    : isEq(car(lat), a)
    ? mr(cdr(lat))
    : cons(car(lat), mr(cdr(lat)));
  return mr(lat);
}

//var sx = str2sx("(1 2 3 2 4)");        
//return sx2str(let_multirember_2(2, sx));

var rember_isEq2 = remberF(isEq);  // remberF is from chapter8.js

//sx = str2sx("(1 2 3 2 4 5 2)");
//return sx2str(rember_isEq2(2, sx));

// p.23 multirember-f, view with return multiremberF; (from Chapter8)

// multiremberF p. 24, with a letrec
function multiremberF_letrec(test) {
  let m_f;
  m_f = function (a, lat) {
    return isNull(lat)
    ? null
    : test(a, car(lat))
    ? m_f(a, cdr(lat))
    : cons(car(lat), m_f(a, cdr(lat)));
  }
  return m_f;
}

//sx = str2sx("(a b c b d b)");
//return sx2str(multiremberF_letrec(isEq)("b", sx));

// multiremberF p. 24, with a letrec 
// and Javascript arrow function
function multiremberF_letrec(test) {
  let m_f;
  m_f = (a, lat) => isNull(lat)
    ? null
    : test(a, car(lat))
    ? m_f(a, cdr(lat))
    : cons(car(lat), m_f(a, cdr(lat)));
  return m_f;
}

// p.27 member?, using the Twelfth Commandment
function isMember_letrec(a, lat) {
  let isYes;
  isYes = (l2) => isNull(l2)
    ? false
    : isEq(car(l2), a)
    ? true
    : isYes(a, cdr(l2));
  return isYes(lat);
}

function union(set1, set2) {
  return isNull(set1)
  ? set2
  : isMember(car(set1), set2)
  ? union(cdr(set1), set2)
  : cons(car(set1), union(cdr(set1), set2));
}

//let set1 = str2sx("(tomatoes and macaroni casserole)");
//let set2 = str2sx("(macaroni and cheese)");
//return sx2str(union(set1, set2));

function union_letrec(set1, set2) {
  let U;
  U = (set) => isNull(set)
    ? set2
    : isMember(car(set), set2)
    ? U(cdr(set))
    : cons(car(set), U(cdr(set)));
  return U(set1);
}

// This version uses the 12th and 13th Commandments
// 12th: not passing set2 and a unnecessarily
// 13th: hiding and protecting isMember
function union_p32(set1, set2) {
  let U, M;
  U = (set) => isNull(set)
    ? set2
    : M(car(set), set2) // after let M, OK to define M later
    ? U(cdr(set))
    : cons(car(set), U(cdr(set)));
  M = function (a, lat) {
    let N;
    N = (lat) => isNull(lat)
      ? false
      : isEq(car(lat), a)
      ? true
      : N(cdr(lat));
    return N(lat);
  }
  return U(set1);
}

function two_in_a_row(lat) { // p.34
  let T;
  T = (preceding, lat) => isNull(lat)
    ? false
    : isEq(car(lat), preceding) || T(car(lat), cdr(lat));
  return isNull(lat)
    ? false
    : T(car(lat), cdr(lat));
}

//return two_in_a_row(str2sx("(1 2 3 3 4 5)"));

function sum_of_prefixes(tup) {
  let S;
  S = (sonssf, tup) => isNull(tup)
    ? null
    : cons(plus(sonssf, car(tup)),
           S(plus(sonssf, car(tup)), cdr(tup)));
  return S(0, tup);
}

// return sx2str(sum_of_prefixes(str2sx("(1 1 1 1 1)")));

function scramble(tup) {
  let S;
  S = (tup, rp) => isNull(tup) // rp reversedPrefix
    ? null
    : cons(pick(car(tup), cons(car(tup), rp)),
	   S(cdr(tup), cons(car(tup), rp)));
  return S(tup);
}

// return sx2str(scramble(str2sx("(1 1 1 3 4 2 1 1 9 2)")));


