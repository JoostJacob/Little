
// Chapter 4 "Numbers Games"

function plus2(a, b) {  // this is what I came up with
  return isZero(b)
  ? a
  : plus(add1(a), sub1(b));
}
 
function plus(a, b) { // this is like the solution in Little Scheme
  return isZero(b)
    ? a
    : add1(plus(a, sub1(b)));
}

function minus(a, b) {
  return isZero(b)
    ? a
    : sub1(minus(a, sub1(b)));
}

function addtup(tup) {
  return isNull(tup)
  ? 0
  : plus(car(tup), addtup(cdr(tup)));
}

function star(a, b) { // this is multiplication
  return isZero(b)
  ? 0
  : plus(a, star(a, sub1(b)));
}

function tupplus(t1, t2) {
  return isNull(t1)
  ? null
  : cons( plus(car(t1), car(t2)), tupplus( cdr(t1), cdr(t2) ));
}

function gt(n, m) {
  return isZero(n)
  ? false
  : isZero(m)
  ? true
  : gt(sub1(n), sub1(m));
}

function lt(n, m) {
  return isZero(m)
  ? false
  : isZero(n)
  ? true
  : lt(sub1(n), sub1(m));
}

function isEqn(n, m) {
  return gt(n, m)
  ? false
  : lt(n, m)
  ? false
  : true;
}

function power(n, m) {
  return isZero(m)
  ? 1
  : star(n, power(n, sub1(m)));
}

function quotient(n, m) {
  return lt(n, m)
  ? 0
  : add1(quotient(minus(n, m), m));
}

function length(lat) {
  return isNull(lat)
  ? 0
  : add1(length(cdr(lat)));
}

function pick(n, lat) {
  return lt(n, 2)
  ? car(lat)
  : pick(sub1(n), cdr(lat));
}

function rempick(n, lat) {
  return isNull(lat)
  ? null
  : lt(n, 2)
  ? cdr(lat)
  : cons(car(lat), rempick(sub1(n), cdr(lat)));
}

function noNums(lat) {
  return isNull(lat)
  ? null
  : isNumber(car(lat))
  ? noNums(cdr(lat))
  : cons(car(lat), noNums(cdr(lat)));
}

function allNums(lat) {
  return isNull(lat)
  ? null
  : isNumber(car(lat))
  ? cons(car(lat), allNums(cdr(lat)))
  : allNums(cdr(lat));
}

function isEqan2(a1, a2) {  // my solution
  return isNumber(a1)
  ? ( isNumber(a2)
      ? isEqn(a1, a2)
      : false
    )
  : ( isNumber(a2)
      ? false
      : isEq(a1, a2)
    )
}

function isEqan(a1, a2) {  // with || and $$ like in The Little Schemer
    return (
        (isNumber(a1) && isNumber(a2))
        ? isEqn(a1, a2)
        : (
            (isNumber(a1) || isNumber(a2))
            ? false
            : isEq(a1, a2)
        )
    );
}

function occur(a, lat) {
  return isNull(lat)
  ? 0
  : isEqan(car(lat), a)
  ? add1(occur(a, cdr(lat)))
  : occur(a, cdr(lat));
}

function isOne(n) {
  return isEqn(n, 1);
}

function rempick(n, lat) {
  return isNull(lat)
  ? null
  : isOne(n)
  ? cdr(lat)
  : cons(car(lat), rempick(sub1(n), cdr(lat)));
}
