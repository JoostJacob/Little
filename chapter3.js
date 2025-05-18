
// Chapter 3 Cons the Magnificent
function rember(a, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(a, car(lat))  
  ? cdr(lat)  
  : cons(car(lat), rember(a, cdr(lat)));
}

function firsts(l) {  
  return isNull(l)  
  ? null  
  : cons(car(car(l)), firsts(cdr(l)));
}

function insertR(new2, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(old, car(lat))  
  ? cons(old,cons(new2, cdr(lat)))
  : cons(car(lat),insertR(new2,old,cdr(lat)));
}

function insertL(new2, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(old, car(lat))  
  ? cons(new2,lat)  
  : cons(car(lat),insertL(new2,old,cdr(lat)));
}

function subst(nw, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat),old)
  ? cons(nw, cdr(lat))  
  : cons(car(lat), subst(nw, old, cdr(lat)));
}

function subst2(nw, o1, o2, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat), o1) || isEq(car(lat), o2)  
  ? cons(nw, cdr(lat))  
  : cons(car(lat), subst2(nw, o1, o2, cdr(lat)));
}

function multirember(a, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat),a)  
  ? multirember(a, cdr(lat))
  : cons(car(lat), multirember(a, cdr(lat)));
}

function multiinsertR(nw, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat), old)
  ? cons(old, cons(nw, multiinsertR(nw, old, cdr(lat))))  
  : cons(car(lat), multiinsertR(nw, old, cdr(lat)));
}

function multiinsertL(nw, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat), old)
  ? cons(nw, cons(old, multiinsertL(nw, old, cdr(lat))))  
  : cons(car(lat), multiinsertL(nw, old, cdr(lat)));
}

function multisubst(nw, old, lat) {  
  return isNull(lat)  
  ? null  
  : isEq(car(lat), old)
  ? cons(nw, multisubst(nw, old, cdr(lat)))  
  : cons(car(lat), multisubst(nw, old, cdr(lat)));
}
