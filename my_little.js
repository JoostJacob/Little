// my_little.js
// s-list is a JavaScript Array serving as S-expression, meaning an 
// s-list is built with cons's.
// 250217 added undefined results to car cdr and cons.

// In TLS defined only for non-empty s-lists
function car(s) {
    return s[0];
}

// In TLS defined only for non-empty s-lists
function cdr(s) {
    return s[1];
}

// defined only for s-lists
// added Array.isArry(s) && s.length === 0, for isNull([]);
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

function isLat (l) {
    return isNull(l)
    ? true
    : !isAtom(car(l))
    ? false
    : isLat(cdr(l));
}
                

// Produce a printable presentation of an s-expression

function p(x) {
    var r;
    if (isList(x)) {
        r = "(";
        do {
            r += p(car(x)) + " ";
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

var rx_token = /\s*([\(\)']|[^\s()']+)?/gmy;

// Produce an array of s-expressions from a source string.
// The source string must be a scheme list in parens like (hi).

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
};

function c2sx(codestr) {
    return s(codestr)[0];
}

var fout = c2sx("(a (b))"); // p(fout) heeft extra haakjes
