
// Chapter 19. Absconding with the Jewels


/*
    The first version of topping needs a throw in Javascript,
    so it forgets its surroundings when called like
    cons(toppings('cake'), toppings('cake'))
*/

let continuation_jump_p158; // this will hold the continuation

const toppings_p158 = function(t) {
  throw continuation_jump_p158(t);
}

function deepB(m, k) { // in Javascript we need extra parameter k
  if (isZero(m)) {     // to keep track of the continuation
    continuation_jump_p158 = (x) => k(x); 
    return k('pizza');
  } else {
      return deepB(sub1(m), (v) => k(cons(v, null)));
  }
}

/*
console.log(sx2str(deepB(6, (x) => x))); // => ((((((pizza))))))
try { toppings_p158('mozzarella');
} catch (e) { console.log(sx2str(e)); }  // => ((((((mozzarella))))))
try { toppings_p158('cake');
} catch (e) { console.log(sx2str(e)); }  // => ((((((cake))))))
// toppings_p158 "forgets everything around it" p.161.2 :
try { console.log(cons(toppings_p158('cake'), toppings_p158('cake'))); 
} catch (e) { console.log(sx2str(e)); }  // => ((((((cake))))))
*/

function deep_co(m, k) { // p161
  return isZero(m)
  ? k('pizza')
  : deep_co(sub1(m), (x) => k(cons(x, null)));
}

/*
console.log(deep_co(0, (x) => x));  // => pizza
console.log(sx2str(deep_co(6, (x) => x)));  // => ((((((pizza))))))
console.log(sx2str(deep_co(2, (x) => x)));  // => ((pizza))
*/


let toppings; // deep&coB p.163 uses toppings from p.158

function deep_coB(m, k) { // p.163
  if (isZero(m)) {
    toppings = (x) => k(x);
    return k('pizza');
  } else {
    return deep_coB(sub1(m), (v) => k(cons(v, null)));
  }
}

/*
let p = sx2str(deep_coB(4, (x) => x));
console.log(p);  // => ((((pizza))))
p = sx2str(cons(toppings('cake'), toppings('cake')));
console.log(p);  // => ((((cake)))) ((((cake)))) 
p = sx2str(
  cons(toppings('cake'), 
    cons(toppings('mozzarella'), 
      cons(toppings('pizza'), 
        null))));
console.log(p);  // => (((((cake)))) ((((mozzarella)))) ((((pizza)))))
*/

let leave;

function walk(l) {
  if (isNull(l)) return null
  else if (isAtom(car(l))) {
    throw car(l);
  } else {
    walk(car(l));
    return walk(cdr(l));
  }
}

function start_it(l) {
  try {
    leave = walk(l);
  } catch(here) {
    leave = here;
  }
  return leave;
}

let l = str2sx('((potato) (chips) (chips (with))) fish)');
//console.log(start_it(l)); // => potato
//console.log(start_it(null)); // => null

let rest; // this will hold the continuation

const fill = function() {
  throw rest();
}

function waddle(l, k) {
  if (isNull(l)) return null
  else if (isAtom(car(l))) {
    rest = () => k(waddle(cdr(l), () => k()));
    throw car(l);
  } else {
    if (isNull(car(l))) {
      return waddle(cdr(l), () => null);
    } else {
      return waddle(car(l), () => k(waddle(cdr(l), () => null)));
    }
  }
}

function start_it2(l) {
  try {
    leave = waddle(l, () => null);
  } catch(here) {
    leave = here;
  }
  return leave;
}

//l = str2sx('((donuts) (cheerios (cheerios (spaghettios))) donuts)');
//console.log(start_it2(l)); // => donuts

function get_next() {
  try {
    leave = fill();
  } catch(here_again) {
    leave = here_again;
  }
  return leave;
}

function get_first(l) {
  try {
    leave = waddle(l, () => null);
    rest = () => null;
  } catch(here) {
    leave = here;
  }
  return leave
}

//l = str2sx('((donuts) (cheerios (cheerios (spaghettios))) donuts)');
//l = null;

//console.log(get_first(l)); // => donuts
//console.log(get_next()); // => cheerios
//console.log(get_next()); // => cheerios
//console.log(get_next()); // => spaghettios
//console.log(get_next()); // => donuts
//console.log(get_next()); // => null
//console.log(get_next()); // => null

//l = str2sx('(fish (chips) chips)');
//l = null;
//console.log(get_first(l)); // => fish
//console.log(get_next()); // => chips
//console.log(get_next()); // => chips

function is_two_in_a_row_star_p175(l) {
  let fst = get_first(l);
  return (isAtom(fst))
    ? is_two_in_a_row_b_star(fst)
    : false
}

function is_two_in_a_row_b_star(a) {
  let n = get_next();
  return (isAtom(n))
    ? isEq(n, a) || is_two_in_a_row_b_star(n)
    : false
}

//console.log(is_two_in_a_row_star_p175(l)); // => true

function is_two_in_a_row_star(l) {
  let get_next;

  let T = function(a) {
    let n = get_next();
    return (isAtom(n))
      ? isEq(n, a) || T(n)
      : false
    
  }
  
  get_next = function() {
    try {
      leave = fill();
    } catch(here_again) {
      leave = here_again;
    }
    return leave;    
  }

  let rest;

  const fill = function() {
    throw rest();
  }

  let waddle = function(l, k) {
    if (isNull(l)) return null
    else if (isAtom(car(l))) {
      rest = () => k(waddle(cdr(l), () => k()));
      throw car(l);
    } else {
      if (isNull(car(l))) {
	return waddle(cdr(l), () => null);
      } else {
	return waddle(car(l), () => k(waddle(cdr(l), () => null)));
      }
    }
  }

  let leave;  

  let fst = function(l) {
      try {
	leave = waddle(l, () => null);
	rest = () => null;
      } catch(here) {
	leave = here;
      }
    return leave;
  }(l);
   
  return (isAtom(fst))
    ? T(fst)
    : false
  
}

//l = str2sx('(fish (chips) fish chips (fish) fish chips)');
//l = null;
//l = str2sx('(((food) ()) (((food))))');
//console.log(is_two_in_a_row_star(l)); // => true

