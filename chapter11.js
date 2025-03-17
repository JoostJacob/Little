
function isFirst(a, lat) {
  return isNull(lat)
  ? false
  : isEq(a, car(lat));
}

function isTwo_in_a_row (lat) {
  return isNull(lat)
  ? false
  : isFirst(car(lat), cdr(lat)) || isTwo_in_a_row(cdr(lat));
}

function isTwo_in_a_row_b(preceding, lat) {
  return isNull(lat)
  ? false
  : isEq(car(lat), preceding) || isTwo_in_a_row_b(car(lat), cdr(lat));
}

function isTwo_in_a_row(lat) {
  return isNull(lat)
  ? false
  : isTwo_in_a_row_b(car(lat), cdr(lat));
}

function sp_help(prev, nlat) {
  return isNull(nlat)
  ? null
  : cons(car(nlat)+prev, sp_help(car(nlat)+prev, cdr(nlat)));
}

function sum_prefixes(nlat) {
  return isNull(nlat)
  ? null
  : cons(car(nlat), sp_help(car(nlat), cdr(nlat)));
}

function scramble(tup) {
  return scramble_b(tup, null);
}

function scramble_b(tup, rev_pre) {
  return isNull(tup)
  ? null
  : cons(pick(car(tup), cons(car(tup), rev_pre)),
         scramble_b(cdr(tup), cons(car(tup), rev_pre)));
}
