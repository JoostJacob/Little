
// Chapter 6 Shadows

function isNumbered(s) {
  return isAtom(s)
  ? isNumber(s)
  : isNull(cdr(s))
  ? isNumber(car(s))
  : isNumber(car(s)) && (isEq(car(cdr(s)), "+") || isEq(car(cdr(s)), "*") || 
                         isEq(car(cdr(s)), "^") || isEq(car(cdr(s)), "%")) && isNumbered(car(cdr(cdr(s))));
}

function value(s) {
  function p3(s) {
    return car(cdr(cdr(s)));
  }
  return isAtom(s)
  ? s
  : isEq(car(cdr(s)), "+")
  ? plus(value(car(s)), value(p3(s)))
  : isEq(car(cdr(s)), "-")
  ? minus(value(car(s)), value(p3(s)))
  : isEq(car(cdr(s)), "*")
  ? star(value(car(s)), value(p3(s)))
  : isEq(car(cdr(s)), "%")
  ? quotient(value(car(s)), value(p3(s)))
  : "error";
}
