// Chapter 13 Hop, Skip, and Jump
// Introduces continuations in Scheme.
// In Javascript you can also throw something that is not Error class 

function intersectAll(lset) {
  let A, I;
  A = function (lset) {   // intersectAll
   if (isNull(car(lset))) {
     throw null;
   } else if (isNull(cdr(lset))) {
     return car(lset);
   } else {
     return I(car(lset), A(cdr(lset)));
   }
  }
  I = function (s1, s2) { // intersect
    let J;
    J = function (s1) {
      if (isNull(s1)) {
        return null;
      } else if (isMember(car(s1), s2)) {
        return cons(car(s1), J(cdr(s1)));
      } else {
        return J(cdr(s1));
      }
    }
    if (isNull(s2)) {
      throw null;
    } else {
      return J(s1);
    }
  }
  if (isNull(lset)) {
    return null;
  } else {
    try { 
      return A(lset);
    }
    catch (result) {
      if ((result === null) || (Array.isArray(result))) {
        return result;
      } else {
        throw result;
      }
    }
  }
}

//return sx2str(intersectAll(str2sx("((a b c)(c)(x c z))")));

function rember_up_to(a, lat) {
  function R(lat) { // so you can simulate continuations with exceptions.
    if (isNull(lat)) {
      return null;
    } else if (isEq(car(lat), a)) {
      throw R(cdr(lat)); // jump out of helper function
    } else {
      return cons(car(lat), R(cdr(lat)));
    }
  }
  try {
    return R(lat);
  } catch (result) {
      if ((result === null) || (Array.isArray(result))) {
        return result;
      } else {
        throw result;
      }
  }
}

// Idiomatic Javascript implementation using while, without exception
// Note lat (a b c) is implemented as [a, [b, [c, null]]]
function rember_up_to_js(a, lat) {
  let result = null; 
  let tail; // assigned when result is not null
  while (lat ) {
    if (isEq(car(lat), a)) {
      result = null;
    } else {
      if (result) {
        tail[1] = cons(car(lat), null);
        tail = tail[1];
      } else {
        result = cons(car(lat), null);
        tail = result;
      }
    }
    lat = cdr(lat);
  }
  return result;
}

//return sx2str(rember_up_to_js(2, str2sx("(9 2 3 2 4 5)")));

