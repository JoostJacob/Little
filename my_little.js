// my_little.js
// s-list is a JavaScript Array serving as S-expression, meaning an 
// s-list is composed of cons's.
// 250217 added undefined results to car cdr and cons.
// 250218 added [a] in cons for consing to empty s-list [].

// In TLS defined only for non-empty s-lists
function car(s) {
    return Array.isArray(s) && s.length > 0
    ? s[0]
    : undefined;
}

// In TLS defined only for non-empty s-lists
function cdr(s) {
    return Array.isArray(s) && s.length > 0
    ? s[1]
    : undefined;
}

// defined only for s-lists
// added Array.isArry(s) && s.length === 0, for isNull([]);
function isNull(s) {
    return s === undefined || 
           s === null || 
           Array.isArray(s) && s.length === 0;
}

// In TLS the 2nd argument must be an s-list
function cons(a, s) {
    return Array.isArray(s)
    ? (
        isNull(s)
        ? [a]  // this case missing on Crockford site !
        : [a, s]
      )    
    : undefined;
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
var rx_token = /\s*([\(\)']|[^\s()']+)?/gmy;

var c2sx_deep = function (source) {
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

function c2sx(source) {
    var result = c2sx_deep(source);
    return Array.isArray(result)
           ? result[0]
           : result;
}

var goed = c2sx("(a (b))"); // sx2str geeft goed terug




