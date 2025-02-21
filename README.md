# Little books in javascript?
There is a very nice web-based javascript version of <a href="https://sourceacademy.org/sicpjs/index">
the great SICP textbook</a>.<br>
Can it also be done for 
<a href="https://mitpress.mit.edu/little-books-on-big-topics-in-computer-science/">the Little Books</a>?<br>
<br>
Javascript sandbox <a href="https://joostjacob.github.io/Little/evaljs.html">here</a>.<br>
You can try Javascript code there in the Input Box.<br>
All primitives from Chapter 1 "Toys" are available so you can do the exercises<br>
in Chapter 2 "Do It, Do It Again, and Again, and Again..."<br>
and the exercises in Chapter 3 "Cons the Magnificent".<br>
Do not use "or" in Chapter 2, instead use || in Javascript. Same for "and" and &&.<br>
All the solutions in Javascript up to Chapter 10 by Douglas Crockford are
<a href="https://joostjacob.github.io/Little/little.js">here</a>.<br>
<br>
<hr>
<br>
If you want to try Scheme:<br>=
<a href="https://www.crockford.com/little.html">The Little Javascripter by Douglas Crockford</a> 
is hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>.<br>
You can try Scheme code there in the Input Box.<br>
Unfortunately else is not working in a cond expression, but (gt 2 1) does. I am working on a solution.<br>
<br>
In Scheme a quote character must be a real quote. <br>
On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation".<br>
Or use (define my_atom (quote atom)) and (define my_list (quote '(atom1 atom2))).<br>
Typical usage: (define my_atom 'atom), (define my_list '(atom1 atom2))<br>
<br>
Surprises:<br>
(isList '()): false.<br>
(else ...) in cond doesn't work, instead use some expression always yielding true.<br>
<br>
When calling car or cdr with something else than a non-empty list it does not always return error. 
E.g. (cdr 'hotdog): o<br>
