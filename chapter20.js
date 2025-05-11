
//-----------------------------------------------------------
// Chapter 20. What's In Store?
//

function lookup(table, name) {
  return table(name);
}

function extend(name1, value, table) {
  return function(name2) {
    return isEq(name2, name1)
    ? value
    : table(name2)
  }
}

function isDefine(e) {
  return isAtom(e)
  ? false
  : isAtom(car(e))
  ? isEq(car(e), 'define')
  : false;
}

function Sdefine(e) {
  global_table = extend(
    name_of(e), 
    box(the_meaning(right_side_of(e))),
    global_table);
}
 
function box(it) {
  return function(sel) {
    return sel(it, function(nw) { it = nw; });
  }
}

function setbox(box, nw) {
  box(function(it, set) { set(nw); });
}

function unbox(box) {
  return box(function(it, set) { return it; });
}

function lookup_in_global_table(name) {
  return lookup(global_table, name);
}

function the_meaning(e) {
  return meaning(e, lookup_in_global_table);
}

function meaning(e, table) {
  return expression_to_action(e)(e, table);
}

function Squote(e, table) {
  return text_of(e);
}

function Sidentifier(e, table) {
  return unbox(lookup(table, e));
}

function Sset(e, table) {
  return setbox(
    lookup(table, name_of(e)),
    meaning(right_side_of(e), table));
}

function Slambda(e, table) {
  return function(args) {
    return beglis(
      body_of(e),
      multi_extend(
        formals_of(e),
        box_all(args),
        table));
  }
}

function beglis(es, table) {
  return isNull(cdr(es))
    ? meaning(car(es), table)
    : function(val) { return beglis(cdr(es), table)
    }(meaning(car(es), table));
}

function box_all(vals) {
  return isNull(vals)
    ? null
    : cons(box(car(vals)), box_all(cdr(vals)));
}

function multi_extend(names, values, table) {
  return isNull(names)
    ? table
    : extend(cdr(names), cdr(values), multi_extend(cdr(table)));
}

function Sapplication(e, table) {
  return meaning(function_of(e), table)(
    evlis(arguments_of(e), table));
}

function evlis(args, table) {
  return isNull(args)
    ? null
    : function(val) { 
      return cons(val, evlis(cdr(args), table));
    }(meaning(car(args), table));
}

function a_prim(p) {
  return function(args_list) { 
    return p(car(args_list));
  };
}

function b_prim(p) {
  return function(args_list) {
    return p(car(args_list, cdr(args_list)));
  }
}

let Sconst = function(Dcons, Dcar, Dcdr, DisNull, 
  DisEq, DisAtom, DisZero, Dadd1, Dsub1, DisNumber) {
  return function(e, table) {
    return isNumber(e)
    ? e
    : isEq(e, '#t')
    ? true
    : isEq(e, '#f')
    ? false
    : isEq(e, 'cons')
    ? Dcons
    : isEq(e, 'car')
    ? Dcar
    : isEq(e, 'cdr')
    ? Dcdr
    : isEq(e, 'null?')
    ? DisNull
    : isEq(e, 'eq?')
    ? DisEq
    : isEq(e, 'atom?')
    ? DisAtom
    : isEq(e, 'zero?')
    ? DisZero
    : isEq(e, 'add1')
    ? Dadd1
    : isEq(e, 'sub1')
    ? Dsub1
    : isEq(e, 'number?')
    ? DisNumber
    : "Sconst ERROR";
  }
}(b_prim(cons),
  a_prim(car),
  a_prim(cdr),
  a_prim(isNull),
  b_prim(isEq),
  a_prim(isAtom),
  a_prim(isZero),
  a_prim(add1),
  a_prim(sub1),
  a_prim(isNumber),
);

function Scond(e, table) {
  return evcon(cond_lines_of(e), table);
}

function evcon(lines, table) {
  return isElse(question_of(car(lines)))
  ? meaning(answer_of(car(lines)), table)
  : meaning(question_of(car(lines)), table)
  ? meaning(answer_of(car(lines)), table)
  : evcon(cdr(lines), table);
}

function skip(e) {
  throw e;
}

function Sletcc(e, table) {
  try {
    result = beglis(ccbody_of(e),
      extend(name_of(e), box(a_prim(skip)), table));
  } catch(e) {
    return skip(e);
  }
  return result;
}

let abort = 'INITIAL_ABORT';

function value(e) {
  abort = skip;
  if (isDefine(e)) {
    return Sdefine(e);
  } else {
    try {
      return the_meaning(e);
    } catch(e) {
      return e;
    }
  }
}

function the_empty_table(name) {
  abort('no-answer '+name);
}

let global_table = the_empty_table;

function expression_to_action(e) {
  return isAtom(e)
  ? atom_to_action(e)
  : list_to_action(e);
}

function atom_to_action(e) {
  return isNumber(e)
    ? Sconst
    : isEq(e, '#t')
    ? Sconst
    : isEq(e, '#f')
    ? Sconst
    : isEq(e, 'cons')
    ? Sconst
    : isEq(e, 'car')
    ? Sconst
    : isEq(e, 'cdr')
    ? Sconst
    : isEq(e, 'null?')
    ? Sconst
    : isEq(e, 'eq?')
    ? Sconst
    : isEq(e, 'atom?')
    ? Sconst
    : isEq(e, 'zero?')
    ? Sconst
    : isEq(e, 'add1')
    ? Sconst
    : isEq(e, 'sub1')
    ? Sconst
    : isEq(e, 'number?')
    ? Sconst
    : Sidentifier;
}

function list_to_action(e) {
  return isAtom(car(e))
    ? isEq(car(e), 'quote')
      ? Squote
      : isEq(car(e), 'lambda')
      ? Slambda
      : isEq(car(e), 'letcc')
      ? Sletcc
      : isEq(car(e), 'set_bang')
      ? Sset_bang
      : isEq(car(e), 'cond')
      ? Scond
      : Sapplication
    : Sapplication;
}

function text_of(x)    { return car(cdr(x)); }
function formals_of(x) { return car(cdr(x)); }
function body_of(x)    { return car(cdr(x)); }
function ccbody_of(x)  { return car(cdr(x)); }
function name_of(x)    { return car(cdr(x)); }

function right_side_of(x) {
  return isNull(cdr(cdr(x)))
    ? 0
    : car(cdr(cdr(x)));
}

function cond_lines_of(x) { return cdr(x); }

function isElse(x) {
  return isAtom(x)
    ? isEq(x, 'else')
    : false;
}

function question_of(x) { return car(x); }
function answer_of(x) { return cdr(x); }
function function_of(x) { return car(x); }
function arguments_of(x) { return cdr(x); }

function run(program) {
  if (isNull(program)) return 'NO_INPUT'
  else {
    if (isNull(cdr(program))) {
      return value(car(program));
    } else {
      value(car(program));
      return run(cdr(program));
    }
  }
}

