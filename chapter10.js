
let new_entry = build;

function lookup_in_entry_help(name, names, values, entry_f) {
  return isNull(names)
  ? entry_f(name)
  : isEqual(car(names), name)
  ? car(values)
  : lookup_in_entry_help(name, cdr(names), cdr(values), entry_f);
}

function lookup_in_entry(name, entry, entry_f) {
  return lookup_in_entry_help(name, first(entry), second(entry), entry_f);
}

function entry_f(name) {
  return "Not Found in entry: " + name;
}

let extend_table = cons;

function table_f(name) {
  return "Not Found in table: " + name;
}

function lookup_in_table(name, table, table_f) {
  return isNull(table)
  ? table_f(name)
  : lookup_in_entry(name, 
      car(table),
      function (name) { 
        return lookup_in_table(name, cdr(table), table_f);
      });
}

function expression_to_action(e) {
  return isAtom(e)
  ? atom_to_action(e)
  : list_to_action(e);
}

function atom_to_action(e) {
  return isNumber(e)
  ? fconst
  : isEq(e, "#t")
  ? fconst
  : isEq(e, "#f")
  ? fconst
  : isEq(e, "cons")
  ? fconst
  : isEq(e, "car")
  ? fconst
  : isEq(e, "cdr")
  ? fconst
  : isEq(e, "null?")
  ? fconst
  : isEq(e, "eq?")
  ? fconst
  : isEq(e, "atom?")
  ? fconst
  : isEq(e, "zero?")
  ? fconst
  : isEq(e, "add1")
  ? fconst
  : isEq(e, "sub1")
  ? fconst
  : isEq(e, "number?")
  ? fconst
  : fidentifier;
}

function list_to_action(e) {
  return isAtom(car(e))
  ? isEq(car(e), "quote")
    ? fquote
    : isEq(car(e), "lambda")
    ? flambda
    : isEq(car(e), "cond")
    ? fcond
    : fapplication
  : fapplication;
}

function meaning(e, table) {
  return expression_to_action(e)(e, table);
}

function value(e) {
  return meaning(e, null);
}

function fconst(e, table) {
  return isNumber(e)
  ? e
  : isEq(e, "#t")
  ? true
  : isEq(e, "#f")
  ? false
  : build("primitive", e);
}

function fquote(e, table) {
  return text_of(e);
}

let text_of = second;

function fidentifier(e, table) {
  return lookup_in_table(e, table, initial_table);
}

function initial_table(name) {
  return car(null);  // When is it used? Let's hope never.
}

function flambda(e, table) {
  return build("non-primitive", cons(table, cdr(e)));
}

let table_of = first;
let formals_of = second;
let body_of = third;

function evcon(lines, table) {
  return isElse(question_of(car(lines)))
  ? meaning(answer_of(car(lines)), table)
  : meaning(question_of(car(lines)), table)
  ? meaning(answer_of(car(lines)), table)
  : evcon(cdr(lines), table);
}

function isElse(x) {
  return isAtom(x)
  ? isEq(x, "else")
  : false;
}

let question_of = first;
let answer_of = second;
let cond_lines_of = cdr;

function fcond(e, table) {
  return evcon(cond_lines_of(e), table);
}

//var e = str2sx("(cond (coffee klatsch) (else party))");
//var table = str2sx("(((coffee) (#t)) ((klatsch party) (5 (6))))");
//sx2str(fcond(e, table));

function evlis(args, table) {
  return isNull(args)
  ? null
  : cons(meaning(car(args), table), evlis(cdr(args), table));
}

function fapplication(e, table) {
  return apply(meaning(function_of(e), table), 
               evlis(arguments_of(e), table));
}

let function_of = car;
let arguments_of = cdr;

function isPrimitive(l) {
  return isEq(first(l), "primitive");
}

function isNonPrimitive(l) {
  return isEq(first(l), "non-primitive");
}

function apply(fun, vals) {
  return isPrimitive(fun)
  ? apply_primitive(second(fun), vals)
  : isNonPrimitive(fun)
  ? apply_closure(second(fun), vals)
  : undefined;
}

function apply_primitive(name, vals) {
  return isEq(name, "cons")
  ? cons(first(vals), second(vals))
  : isEq(name, "car")
  ? car(first(vals))
  : isEq(name, "cdr")
  ? cdr(first(vals))
  : isEq(name, "null?")
  ? isNull(first(vals))
  : isEq(name, "eq?")
  ? isEq(first(vals), second(vals))
  : isEq(name, "atom?")
  ? isAtomResult(first(vals))
  : isEq(name, "zero?")
  ? isZero(first(vals))
  : isEq(name, "add1")
  ? add1(first(vals))
  : isEq(name, "sub1")
  ? sub1(first(vals))
  : isEq(name, "number?")
  ? isNumber(first(vals))
  : undefined;
}

function isAtomResult(x) {
  return isAtom(x)
  ? true
  : isNull(x)
  ? false
  : isEq(car(x), "primitive")
  ? true
  : isEq(car(x), "non-primitive")
  ? true
  : false;
}

function apply_closure(closure, vals) {
  return meaning(body_of(closure), 
    extend_table(new_entry(formals_of(closure), vals), table_of(closure)));
}

let closure = str2sx("((((u v w)(1 2 3))((x y z)(4 5 6)))(x y)(cons z x))");
let vals = str2sx("((a b c)(d e f))");

//sx2str(new_entry(formals_of(closure), vals));
//sx2str(table_of(closure));

let table = extend_table(new_entry(formals_of(closure), vals), table_of(closure));
let args = str2sx("(z x)");

//sx2str(evlis(args, table));  // ==> (6 (a b c))
//sx2str(meaning("cons", table)); // ==> (primitive cons)

//sx2str(apply(meaning("cons", table), evlis(args, table)));  // ==> (6 a b c)

function run(code_string) {
  return sx2str(value(str2sx(code_string)));
}

//str = "(cdr (quote (a b c)))";
//run(str);  // correct (b c)

//str = "((lambda (n) (cond ((zero? n) #f)(else (zero? (sub1 n)))))(quote 1))"  // ==> #t
//value(str2sx((str)));

//str = "((lambda (x)(cons x (quote ())))(quote (foo bar baz)))";  // ==> ((foo bar baz))
//run(str);
