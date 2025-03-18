// All functions needed for Chapter 7
// To create an s-expression use str2sx, to view it use sx2str.

// In TLS defined only for non-empty s-lists
function car(s) {
    return s[0];
}

// In TLS defined only for non-empty s-lists
function cdr(s) {
    return s[1];
}

// In TLS defined only for s-lists
// isNull([]) -> false, isNull(null) -> true.
function isNull(s) {
    return s === undefined || s === null;
}

// In TLS the 2nd argument must be an s-list
function cons(a, s) {
    return [a, s];
}

function isAtom(a) {
    return (
        typeof a === "string"
        || typeof a === "number"
        || typeof a === "boolean"
    );
}

// In TLS only for non-numeric atoms.
function isEq(s, t) {
    return s === t || (isNull(s) && isNull(t));
}

function isFunction(a) {
    return typeof a === "function";
}

function isList(a) {
    return Array.isArray(a);
}

function isNumber(a) {
    return Number.isFinite(a);
}

function isUndefined(a) {
    return a === undefined;
}

function isZero(s) {
    return s === 0;
}

function add1(n) {
    return n + 1;
}

function sub1(n) {
    return n - 1;
}


// Produce a printable presentation of an s-expression

function sx2str(x) {
    var r;
    if (isList(x)) {
        r = "(";
        do {
            r += sx2str(car(x)) + " ";
            x = cdr(x);
        } while (isList(x));
        if (r.charAt(r.length - 1) === " ") {
            r = r.substr(0, r.length - 1);
        }
        if (isAtom(x)) {
            r += " . " + x;
        }
        return r + ")";
    }
    if (isNull(x)) {
        return "()";
    }
    return x;
}


// Produce an array of s-expressions from a source string.
// The source string must be a scheme list in parens like (hi).

function str2sx(codestr) {

  var rx_token = /\s*([\(\)']|[^\s()']+)?/gmy;
  
  var s = function (source) {
    var result = [];
    var expr;
    var num;
    rx_token.lastIndex = 0;
    return (function array() {
        expr = (function expression() {
            var head = null;
            var neo = null;
            var match = rx_token.exec(source);
            var sexp = (match && match[1]) || "";
            var tail = null;

            if (sexp === "(") {
                while (true) {
                    sexp = expression();
                    if (sexp === "" || sexp === ")") {
                        return head;
                    }
                    neo = [sexp];
                    if (tail) {
                        tail[1] = neo;
                    } else {
                        tail = neo;
                        head = neo;
                    }
                    tail = neo;
                }
            } else if (!sexp) {
                sexp = source.slice(rx_token.lastIndex);
                if (sexp) {
                    rx_token.lastIndex = source.length;
                    return "ERROR: " + sexp;
                } else {
                    return "";
                }
            } else if (sexp === "'") {
                return ["quote", [expression()]];
            } else {
                num = Number(sexp);
                return (
                    (Number.isFinite(num) && sexp.length > 0)
                    ? num
                    : sexp
                );
            }
        }());
        if (expr) {
            result.push(expr);
            return array();
        } else {
            return result;
        }
    }())
  }
  return s(codestr)[0]; // Crockford's s() nested 1 too deep
}

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

// Chapter 5

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

// Chapter 2 rewritten with isEqual
function isLat(l) {  return isNull(l)  ? true  : ! isAtom(car(l))  ? false  : isLat(cdr(l)); }
function isMember(a, lat) {  return isNull(lat)  ? false  : isEqual(a, car(lat))  ? true  : isMember(a, cdr(lat)); }
// Chapter 3 rewritten with isEqual
function rember(a, lat) {  return isNull(lat)  ? null  : isEqual(a, car(lat))  ? cdr(lat)  : cons(car(lat), rember(a, cdr(lat)));}
function firsts(l) {  return isNull(l)  ? null  : cons(car(car(l)), firsts(cdr(l)));}
function insertR(new2, old, lat) {  return isNull(lat)  ? null  : isEqual(old, car(lat))  ? cons(old,cons(new2, cdr(lat)))
  : cons(car(lat),insertR(new2,old,cdr(lat)));}
function insertL(new2, old, lat) {  return isNull(lat)  ? null  : isEqual(old, car(lat))  ? cons(new2,lat)  : cons(car(lat),insertL(new2,old,cdr(lat)));}
function subst(nw, old, lat) {  return isNull(lat)  ? null  : isEqual(car(lat),old)
  ? cons(nw, cdr(lat))  : cons(car(lat), subst(nw, old, cdr(lat)));}
function subst2(nw, o1, o2, lat) {  return isNull(lat)  ? null  : isEqual(car(lat), o1) || isEqual(car(lat), o2)  
  ? cons(nw, cdr(lat))  : cons(car(lat), subst2(nw, o1, o2, cdr(lat)));}
function multirember(a, lat) {  return isNull(lat)  ? null  : isEqual(car(lat),a)  ? multirember(a, cdr(lat))
  : cons(car(lat), multirember(a, cdr(lat)));}
function multiinsertR(nw, old, lat) {  return isNull(lat)  ? null  : isEqual(car(lat), old)
  ? cons(old, cons(nw, multiinsertR(nw, old, cdr(lat))))  : cons(car(lat), multiinsertR(nw, old, cdr(lat)));}
function multiinsertL(nw, old, lat) {  return isNull(lat)  ? null  : isEqual(car(lat), old)
  ? cons(nw, cons(old, multiinsertL(nw, old, cdr(lat))))  : cons(car(lat), multiinsertL(nw, old, cdr(lat)));}
function multisubst(nw, old, lat) {  return isNull(lat)  ? null  : isEqual(car(lat), old)
  ? cons(nw, multisubst(nw, old, cdr(lat)))  : cons(car(lat), multisubst(nw, old, cdr(lat)));}

function occur(a, lat) { // rewritten with isEqual
  return isNull(lat)
  ? 0
  : isEqual(car(lat), a)
  ? add1(occur(a, cdr(lat)))
  : occur(a, cdr(lat));
}

// chapter 7
function isSet(lat) {
  return isNull(lat)
  ? true
  : isMember(car(lat), cdr(lat))
  ? false
  : isSet(cdr(lat));
}

function makeSet(lat) {
  return isNull(lat)
  ? null
  : cons(car(lat), multirember(car(lat), makeSet(cdr(lat))))
}

function isSubset(set1, set2) {
  return isNull(set1) || isMember(car(set1), set2) && isSubset(cdr(set1), set2);
}

function isEqset_mytry_works_but_can_be_shorter(set1, set2) {
  return isNull(set1) && isNull(set2)
  ? true
  : isNull(set1) || isNull(set2)
  ? false
  : isMember(car(set1), set2) && isEqset(cdr(set1), rember(car(set1), set2));
}

function isEqset(set1, set2) {
  return isSubset(set1, set2) && isSubset(set2, set1);
}

function isIntersect(set1, set2) {
  return isNull(set1)
  ? false
  : isMember(car(set1), set2) || isIntersect(cdr(set1), set2);
}

function intersect(set1, set2) {
  return isNull(set1)
  ? null
  : isMember(car(set1), set2)
  ? cons(car(set1), intersect(cdr(set1), set2))
  : intersect(cdr(set1), set2);
}

function union_mine(set1, set2) {
  return isNull(set1)
  ? set2
  : cons(car(set1), union_mine(cdr(set1), rember(car(set1), set2)));
}

function union(set1, set2) {
  return isNull(set1)
  ? set2
  : isMember(car(set1), set2)
  ? union(cdr(set1), set2)
  : cons(car(set1), union(cdr(set1), set2));
}

function difference(set1, set2) {
  return isNull(set1)
  ? null
  : isMember(car(set1), set2)
  ? difference(cdr(set1), set2)
  : cons(car(set1), difference(cdr(set1), set2));
}

function intersectall(lset) {
  return isNull(cdr(lset))
  ? car(lset)
  : intersect(car(lset), intersectall(cdr(lset)));
}

function isPair(lat) {
  return isNull(lat) || isNull(cdr(lat))
  ? false
  : isNull(cdr(cdr(lat)));
}

function first(p) {
  return car(p);
}

function second(p) {
  return car(cdr(p));
}

function build(s1, s2) {
  return cons(s1, cons(s2, null));
}

function third(l) {
  return car(cdr(cdr(l)));
}

function isFun(rel) {
  return isSet(firsts(rel))
}

function revpair(p) {
  return build(second(p), first(p));
}

function revrel(rel) {
  return isNull(rel)
  ? null
  : cons(revpair(car(rel)), revrel(cdr(rel)));  
}

function isFullfun(rel) {
  return isSet(firsts(rel)) && isSet(firsts(revrel(rel)));
}

function isOne_to_one(rel) {
  return isFun(revrel(rel));
}

// chapter 8
function rember_f(isTest, a, ls) { // isTest is a boolean function with 2 params, ls is a list of s-expressions
  return isNull(ls)
  ? null
  : isTest(car(ls), a)
  ? rember_f(isTest, a, cdr(ls))
  : cons(car(ls), rember_f(isTest, a, cdr(ls)));
}

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

var insertL = insertG(seqL);
var insertR = insertG(seqR);
var subst = insertG(seqS);
var rember = insertG(seqRemove);

function atom2function(x) {
  return isEq(x, "+")
  ? plus
  : isEq(x, "*")
  ? star
  : power;
}

function get_value(nexp) {  // not using name value because of chapter 10
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

// usage filter2(sx, isEven, ch8_answer)
function filter2(s, isTest, col) {  // maybe something to keep
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
