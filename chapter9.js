
// Chapter 9 ... and Again, and Again, and Again, ...

function pick(n, lat) {
  return isNull(lat)
  ? false
  : lt(n, 2)
  ? car(lat)
  : pick(sub1(n), cdr(lat));
}

function looking(a, lat) {
  return keep_looking(a, pick(1, lat), lat);
}

function keep_looking(a, where, lat) {
  return isNull(lat)
  ? false
  : isNumber(where)
  ? keep_looking(a, pick(where, lat), lat)
  : isEq(where, a);
}

function eternity(x) {
  eternity(x);
}

function shift(pair) {
  return build(first(first(pair)), build(second(first(pair)), second(pair)));
}

function isPair(lat) {
  return isNull(lat) || isNull(cdr(lat))
  ? false
  : isNull(cdr(cdr(lat)));
}

function align(pora) {  // pora for Pair OR Atom
  return isAtom(pora)
  ? pora
  : isPair(first(pora))
  ? align(shift(pora))
  : build(first(pora), align(second(pora)));
}

function length_star_ch9(pora) {  
  return isAtom(pora)
  ? 1
  : length_star_ch9(first(pora)) + length_star_ch9(second(pora));
}

function weight(pora) {
  return isAtom(pora)
  ? 1
  : weight(first(pora)) * 2 + weight(second(pora));
}

function shuffle(pora) {
  return isAtom(pora)
  ? pora
  : isPair(first(pora))
  ? shuffle(revpair(pora))
  : build(first(pora), shuffle(second(pora)));
}

function C(n) {
  return isOne(n)
  ? 1
  : isEven(n)
  ? C(quotient(n, 2))
  : C(add1(3 * n));
}

function A(n, m) {
  return isZero(n)
  ? add1(m)
  : isZero(m)
  ? A(sub1(n), 1)
  : A(sub1(n), A(n, sub1(m)));
}

var length_zero = function (l) {
  return isNull(l)
  ? 0
  : add1(eternity(cdr(l)));
}

// replace eternity by function definition of length_zero, p.160
let length_one = function (l) {
  return isNull(l)
  ? 0
  : add1(function (l) {
           return isNull(l)
           ? 0
           : add1(eternity(cdr(l)));
         }(cdr(l)));
}

let length_two = function (l) {  // and again replace eternity, p.161
  return isNull(l)
  ? 0
  : add1(function (l) {
           return isNull(l)
           ? 0
           : add1(function (l) {
                    return isNull(l)
                    ? 0
                    : add1(eternity(cdr(l)));
                  }(cdr(l)));
         }(cdr(l)));
}

let length_0 = function (length_f) { // p. 162
  return function (l) {
    return isNull(l)
    ? 0
    : add1(length_f(cdr(l)));
  }
}(eternity);

let length_1 = function (length_f) {
  return function (l) {
    return isNull(l)
    ? 0
    : add1(length_f(cdr(l)));
  }
}(function (length_f) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length_f(cdr(l)));
    }
  }(eternity));

let length_2 = function (length_f) {
  return function (l) {
    return isNull(l)
    ? 0
    : add1(length_f(cdr(l)));
  }
}(function (length_f) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length_f(cdr(l)));
    }
  }(function (length_f) {
      return function (l) {
        return isNull(l)
        ? 0
        : add1(length_f(cdr(l)));
      }
    }(eternity)));

let len_0 = function (mk_length) {  // p.164
  return mk_length(eternity);
}(
  function (length) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length(cdr(l)));
    }
  }  
 );

let len_1 = function (mk_length) {
  return mk_length(mk_length(eternity));
}(
  function (length) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length(cdr(l)));
    }
  }  
 );

let len_3 = function (mk_length) {
  return mk_length(mk_length(mk_length(mk_length(eternity))));
}(
  function (length) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length(cdr(l)));
    }
  }  
 );

let length_167 = function (mk_length) { // p.167
  return mk_length(mk_length);
}(
  function (mk_length) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(mk_length(mk_length)(cdr(l)));
    }
  }  
 );

let length_171 = function (mk_length) {  // p.171
  return mk_length(mk_length);
}(function (mk_length) {
    return function(length) {
      return function (l) {
        return isNull(l)
        ? 0
        : add1(
            length(cdr(l)) );
      }
    }(function (x) {
        return mk_length(mk_length)(x);
      }
     );
  }
 );

let length_172 = function (le) {  // p. 172
  return function (mk_length) {
    return mk_length(mk_length);
  }(function (mk_length) {
      return le(function (x) {
                  return mk_length(mk_length)(x);});});
}
(function (length) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(length(cdr(l)) );
    };
 });

function Y (le) {
  return function (f) {
    return f(f);
  }(function (f) {
      return le(function (x) {
        return f(f)(x);});});
}

length_y = Y(function (lf) {
    return function (l) {
      return isNull(l)
      ? 0
      : add1(lf(cdr(l)) );
    };
 });
