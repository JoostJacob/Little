
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
