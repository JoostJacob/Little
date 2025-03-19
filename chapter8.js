
function isEq_c(a) {
  return function (x) {
    return isEq(x, a);
  };
}

function remberF(isTest) {
  return function(a, ls) {
    return isNull(ls)
    ? null
    : isTest(car(ls), a)
    ? remberF(isTest)(a, cdr(ls))
    : cons(car(ls), remberF(isTest)(a, cdr(ls)));
  }
}

function insertLF(isTest) {
  return function(nw, old, ls) {
    return isNull(ls)
    ? null
    : isTest(car(ls), old)
    ? cons(nw, cons(old, cdr(ls)))
    : cons(car(ls), insertLF(isTest)(nw, old, cdr(ls)));
  }
}

function insertG(seq) {
  return function(nw, old, ls) {
    return isNull(ls)
    ? null
    : isEqual(car(ls), old)
    ? seq(nw, ls)
    : cons(car(ls), insertG(seq)(nw, old, cdr(ls)));
  }
}

function seqL(nw, ls) {
  return cons(nw, cons(car(ls), cdr(ls)));
}

function seqR(nw, ls) {
  return cons(car(ls), cons(nw, cdr(ls)));
}

function seqS(nw, ls) {
  return cons(nw, cdr(ls));
}

function seqRemove(nw, ls) {
  return cdr(ls);
}

let insertL = insertG(seqL);
let insertR = insertG(seqR);
let subst = insertG(seqS);
let rember = insertG(seqRemove);

function atom2function(x) {
  return isEq(x, "+")
  ? plus
  : isEq(x, "*")
  ? star
  : power;
}

function get_value(nexp) {  // do not use name "value" or Ch.10's value will be bad
  return isAtom(nexp)
  ? nexp
  : atom2function(car(nexp))(car(cdr(nexp)), car(cdr(cdr(nexp))));
}

function multiremberF(test) {
  return function (a, lat) {
    return isNull(lat)
    ? null
    : test(a, car(lat))
    ? multiremberF(test)(a, cdr(lat))
    : cons(car(lat), multiremberF(test)(a, cdr(lat)));
  }
}

function multiremberT(test, lat) {
  return isNull(lat)
  ? null
  : test(car(lat))
  ? multiremberT(test, cdr(lat))
  : cons(car(lat), multiremberT(test, cdr(lat)));
}

function tunaTest(atom) {
  return isEq("tuna", atom);
}

function multiinsertLRco(nw, oldL, oldR, lat, col) {
  console.log(col);
  console.log(sx2str(lat));
  return isNull(lat)
  ? col(null, 0, 0)
  : isEq(car(lat), oldL)
  ? multiinsertLRco(nw, oldL, oldR, cdr(lat), 
      function (lr, nl, nr) { 
        return col(cons(nw, cons(oldL, lr)), add1(nl), nr);
      })
  : isEq(car(lat), oldR)
  ? multiinsertLRco(nw, oldL, oldR, cdr(lat), 
      function (lr, nl, nr) { 
        return col(cons(oldR, cons(nw, lr)), nl, add1(nr));
      })
  : multiinsertLRco(nw, oldL, oldR, cdr(lat), 
      function (lr, nl, nr) { 
        return col(cons(car(lat), lr), nl, nr);
      });
}

function listcollector(ls, cl, cr) {
  return ls;
}


function isEven(n) {
  return isEqn(star(quotient(n, 2), 2), n);
}

function evens_only_star(s) {
  return isNull(s)
  ? null
  : isNumber(car(s))
  ? isEven(car(s))
    ? cons(car(s), evens_only_star(cdr(s)))
    : evens_only_star(cdr(s))
  : cons(evens_only_star(car(s)), evens_only_star(cdr(s)));
}

function starstar(s) {  // extra for ch8_answer
  return isNull(s)
  ? 1
  : isNumber(car(s))
  ? star(car(s), starstar(cdr(s)))
  : star(starstar(car(s)), starstar(cdr(s)));
}

function plusstar(s) {  // extra for ch8_answer
  return isNull(s)
  ? 0
  : isNumber(car(s))
  ? plus(car(s), plusstar(cdr(s)))
  : plus(plusstar(car(s)), plusstar(cdr(s)));
}

function show_the_collected(se, so) {  // col function for filter2
  return cons(se, cons(" <<< even, odd >>> ", so)); // starstar(so);
}

function ch8_answer(se, so) { // col function for filter2
  return cons(starstar(se), plusstar(so));
}

// My addition, for collecting two lists. Example usage filter2(sx, isEven, ch8_answer)
function filter2(s, isTest, col) {
  return isNull(s)
  ? col(null, null)
  : isNumber(car(s))
  ? isTest(car(s))
    ? filter2(cdr(s), isTest, function (evens, odds) {
        return col(cons(car(s), evens), odds); })
    : filter2(cdr(s), isTest, function (evens, odds) {
        return col(evens, cons(car(s), odds));  }) 
  : filter2(car(s), isTest, function (evens, odds) {
      return filter2(cdr(s), isTest, function (dl_evens, dl_odds) {
            return col(cons(evens, dl_evens), cons(odds, dl_odds)); } ); } );
}

function evensCO(s, col) {
  return isNull(s)
  ? col(null, 1, 0)
  : isNumber(car(s))
  ? isEven(car(s))
    ? evensCO(cdr(s), function (evens, np, ns) {
        return col(cons(car(s), evens), star(car(s),np),ns); })
    : evensCO(cdr(s), function (evens, np, ns) {
        return col(evens, np, plus(car(s), ns)) })
  : evensCO(car(s), function (evens, ap, as) {
      return evensCO(cdr(s), function (dl_evens, dp, ds) {
            return col(cons(evens, dl_evens), star(ap, dp), plus(as, ds)); } ); } );
}

function the_last_friend(newl, product, sum) {
    return cons(sum, cons(product, newl));
}
