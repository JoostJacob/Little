
// Chapter 2
function isLat(l) {  
  return isNull(l)  
  ? true  
  : isAtom(car(l))  
  ? isLat(cdr(l))
  : false;
}

function isMember(a, lat) {  
  return isNull(lat)  
  ? false  
  : isEq(a, car(lat))  
  ? true  
  : isMember(a, cdr(lat));
}
