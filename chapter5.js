
// Chapter 5 *Oh My Gawd*: It's Full of Stars

function remberstar(a, l) {
  return isNull(l)
  ? null     
  : isAtom(car(l))
  ? isEq(car(l), a)
    ? remberstar(a, cdr(l))
    : cons(car(l), remberstar(a, cdr(l)))
  : cons(remberstar(a, car(l)), remberstar(a, cdr(l)));
}

function insertRstar(nw, old, l) {
  return isNull(l)
  ? null
  : isAtom(car(l))
  ? isEq(car(l), old)
    ? cons(old, cons(nw, insertRstar(nw, old, cdr(l))))
    : cons(car(l), insertRstar(nw, old, cdr(l)))
  : cons(insertRstar(nw, old, car(l)), insertRstar(nw, old, cdr(l)));
}

function occurstar(a, l) { // return the # of a in l
  return isNull(l)
  ? 0
  : isAtom(car(l))
  ? isEq(car(l), a)
    ? add1(occurstar(a, cdr(l)))
    : occurstar(a, cdr(l))
  : plus(occurstar(a, car(l)), occurstar(a, cdr(l)));
}

function subststar(nw, old, l) {
  return isNull(l)
  ? null
  : isAtom(car(l))
  ? isEq(car(l), old)
    ? cons(nw, subststar(nw, old, cdr(l)))
    : cons(car(l), subststar(nw, old, cdr(l)))
  : cons(subststar(nw, old, car(l)), subststar(nw, old, cdr(l)));
}

function insertLstar(nw, old, l) {
  return isNull(l)
  ? null
  : isAtom(car(l))
    ? isEq(car(l), old)
      ? cons(nw, cons(old, insertLstar(nw, old, cdr(l))))
      : cons(car(l), insertLstar(nw, old, cdr(l)))
    : cons(insertLstar(nw, old, car(l)), insertLstar(nw, old, cdr(l)));
}

function memberstar(a, l) {
  return isNull(l)
  ? false
  : isAtom(car(l))
    ? isEq(car(l), a)
      ? true
      : memberstar(a, cdr(l))
    : memberstar(a, car(l)) || memberstar(a, cdr(l));
}

function leftmost(l) {
  return isAtom(car(l))
  ? car(l)
  : leftmost(car(l));
}

function isEqlist(l1, l2) {  // first try, p.91 4th ed.
  return isNull(l1) && isNull(l2)
  ? true
  : isNull(l1)
  ? false
  : isNull(l2)
  ? false
  : isAtom(car(l1)) && isAtom(car(l2))
  ? isEqan(car(l1), car(l2)) && isEqlist(cdr(l1), cdr(l2))
  : isAtom(car(l1))
  ? false
  : isAtom(car(l2))
  ? false
  : isEqlist(car(l1), car(l2)) && isEqlist(cdr(l1), cdr(l2));
}

function isEqual(s1, s2) { // for two s-expressions
  return isAtom(s1) && isAtom(s2)
  ? isEqan(s1, s2)
  : isAtom(s1) || isAtom(s2)
  ? false
  : isEqlist(s1, s2);
}

function isEqlist(l1, l2) { // for two lists
  return isNull(l1) && isNull(l2)
  ? true
  : isNull(l1) || isNull(l2)
  ? false
  : isEqual(car(l1), car(l2)) && isEqlist(cdr(l1), cdr(l2)); 
}

function rember(s, l) { // s any s-expression, l a list of s-expressions
  return isNull(l)
  ? null
  : isEqual(car(l), s)
  ? cdr(l)
  : cons(car(l), rember(s, cdr(l)));
}
