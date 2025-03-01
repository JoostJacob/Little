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
