// Chapter 14 Let There Be Names

function leftmost_p66(l) {  // we are going to use let so we can not use 
  if (isNull(l)) return null            // the return ...?...:... syntax
  else if (isAtom(car(l))) return car(l)
  else {
    let a = leftmost_p66(car(l));
    if (isAtom(a)) return a
    else return leftmost_p66(cdr(l));
  }
}

//return sx2str(leftmost_p66(str2sx("(((a) b) (c d))")));

function rember1_p68(a, l) {
  let R = function(l) {
    if (isNull(l)) return null
    else if (isAtom(car(l))) {
      if (isEq(car(l), a)) return cdr(l)
      else return cons(car(l), R(cdr(l)));
    } else {
      let av = R(car(l));
      if (isEqlist(av, car(l))) return cons(car(l), (R(cdr(l))))
      else return cons(av, cdr(l));
    }
  }
  return R(l);
}

//return sx2str(rember1_p68("d", str2sx("(((a) b) (c d))")));

function depth_star(l) {
  if (isNull(l)) return null
  else if (isAtom(car(l))) return depth_star(cdr(l))
  else {
    let a, d;
    a = add1(depth_star(car(l)));
    d = depth_star(cdr(l));
    return Math.max(a, d);
  }
}

//return sx2str(depth_star(str2sx("(((a) b) (c d))")));

function scramble(tup) {
  let P = function(tup, rev_pre) {
    if (isNull(tup)) return null
    else {
      let rp = cons(car(tup), rev_pre);
      return cons(pick(car(tup), rp), P(cdr(tup), rp));
    }
  }
  return P(tup, null);
}

//return sx2str(scramble(str2sx("(1 2 3 4 5)")));

function leftmost(ls) { // implementation with exception when atom found
  let L = function(l) {
    if (isNull(l)) return null
    else if (isAtom(car(l))) throw car(l)
    else {
      L(car(l));
      L(cdr(l));
    }
  }

  try {
    return L(ls);
  } catch (skip) {
    if (isAtom(skip)) {
      return skip;
    } else {
      throw skip; // do not catch SyntaxError etc.
    }
  }
}

//return sx2str(leftmost(str2sx("(((b)) () a ())")));

function rember1star(a, ls) {
  let R = function(l) {
    if (isNull(l)) {
      throw "no";
    }
    else if (isAtom(car(l))) {
      if (isEq(car(l), a)) {
        return cdr(l)
      }
      else {
        return cons(car(l), R(cdr(l)));
      }
    }
    else { // car(l) is a list
      try {
        return cons(R(car(l)), cdr(l));
      } catch(oh2) {
        if (isAtom(oh2)) return cons(car(l), R(cdr(l)))
        else throw oh2; // do not catch SyntaxError etc.
      }
    }
  }

  try {
    return R(ls);
  } catch(oh) {
    if (isAtom(oh)) return ls
    else throw oh; // do not catch SyntaxError etc.
  }
}

//return sx2str(rember1star("a", str2sx("((a) a)")));






