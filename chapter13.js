
// Chapter 13 Hop, Skip, and Jump
// Introduces continuations in Scheme.
// In Javascript you can also throw something that is not Error class 

function intersectall(lset) {
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
  try {
    if (isNull(lset)) {
      return null;
    } else {
      return A(lset);
    }
  } catch (result) {
    return result;
  }
}

// sx2str(intersectall(str2sx("((a b c)(c)(x c z))")));

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
    return result;
  }
}

// sx2str(rember_up_to(2, str2sx("(1 1 2 3 2 4 5)")));

