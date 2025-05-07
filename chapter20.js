
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

let item1 = 'item1';

let box1 = box(item1);
// box 1 is a now function and inside the function
// "it" has value 'item1'

console.log(unbox(box1)); // => item1

item1 = 'item2';
console.log(unbox(box1)); // => item1 ("it" did not change)

setbox(box1, 'item3');
console.log(unbox(box1)); // => item3 ("it" changed)

let box2 = box(box1);
console.log(unbox(box2)); // => [Function (anonymous)]
console.log(unbox(unbox(box2))); // => item3



