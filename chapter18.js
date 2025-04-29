
// Chapter 18. We Change, Therefore We Are the Same!

function bons(kar) {
  let kdr = null;
  return (selector) => selector((x) => kdr = x, kar, kdr);
}

function kar(c) {
  return c((s, a, d) => a);
}

function kdr(c) {
  return c((s, a, d) => d);
}

function set_kdr(c, x) {
  c((s, a, d) => s)(x);
}

function kons(a, d) {
  let c = bons(a);
  set_kdr(c, d);
  return c;
}

function lenkth(lts) {
  return isNull(lts)
    ? 0
    : add1(lenkth(kdr(lts)));
}

function lots(n) {
  return isZero(n)
    ? null
    : kons('egg', lots(sub1(n)));
}

function isEklist(l1, l2) {
  return isNull(l1)
    ? isNull(l2)
    : isNull(l2)
    ? false
    : isEq(kar(l1), kar(l2)) && isEklist(kdr(l1), kdr(l2));
}

function isSame(c1, c2) {
  let t1 = kdr(c1);
  let t2 = kdr(c2);
  set_kdr(c1, 1);
  set_kdr(c2, 2);
  let v = kdr(c1) == kdr(c2);
  set_kdr(c1, t1);
  set_kdr(c2, t2);
  return v;
}

let kounter = () => 0;
let set_kounter = (x) => 0;

function make_konsC() {
  let N = 0;
  kounter = function() { return N };
  set_kounter = function(x) { N = x; };
  return function(x, y) {
    N = add1(N);
    return kons(x, y);
  }
}
const konsC = make_konsC();

function add_at_end(l) {
  return isNull(kdr(l))
    ? konsC(kar(l), kons('egg', null))
    : konsC(kar(l), add_at_end(kdr(l)));
}

function add_at_end_too(l) {
  let A = function(ls) {
    return isNull(kdr(ls))
      ? set_kdr(ls, kons('egg_too', null))
      : A(kdr(ls));
  }
  A(l);
  return l;
}

let dozen = lots(12); // !! errata on felleisen.org
let bakers_dozen_too = add_at_end_too(dozen);
//console.log(isSame(dozen, bakers_dozen_too)); // => true

let q2 = isSame(kons('egg', null), kons('egg', null));
//console.log(q2); // => false

function last_kons(ls) {
  return isNull(kdr(ls))
    ? ls
    : last_kons(kdr(ls));
}

function finite_lenkth(p) {
  let result;
  let qk = (x) => kdr(kdr(x));
  let sl = (x) => kdr(x);
  let C = function(p, q) {
    if (isNull(q)) return 0
    else if (isNull(kdr(q))) return 1
    else if (isSame(p, q)) throw false
    else return C(sl(p), qk(q)) + 2;
  }
  if (isNull(p)) return 0
  else {
    try {
      result = add1(C(p, kdr(p)));
    } catch (e) {
      return e;
    }
  }
  return result;
}

//let long2 = lots(12); // long is reserved in javascript
//console.log(finite_lenkth(long2)); // => 12
//let long3 = set_kdr(last_kons(long2), long2);
//console.log(finite_lenkth(long2)); // => false
//console.log(finite_lenkth(long3)); // => 0
