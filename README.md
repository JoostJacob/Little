# Little books in Javascript?
There is a very nice web-based javascript version of <a href="https://sourceacademy.org/sicpjs/index">
the great SICP textbook</a>.<br>
Can it also be done for 
<a href="https://mitpress.mit.edu/little-books-on-big-topics-in-computer-science/">the Little Books</a>?<br>
<br>
Javascript sandbox <a href="https://joostjacob.github.io/Little/toys.html">here</a>. Put your Javascript code 
in the Input Box and start recursing!<br>
<br>
All primitives from Chapter 1 "Toys" are available so you can do the exercises in Chapter 2 "Do It, Do It Again, and Again, and Again..." and the exercises in Chapter 3 "Cons the Magnificent" and in Chapter 4 "Numbers Games".<br>
Do not use "or" in Chapter 2, instead use || in Javascript. Same for "and" and &&.<br>
<br>
For Chapter 5 "*Oh My Gawd*: It's Full of Stars", you need the solutions from Chapters 1-4, so use
<a href="https://joostjacob.github.io/Little/chapter5.html">this</a> sandbox.<br>
<br>
All the solutions in Javascript up to Chapter 10 by Douglas Crockford are
<a href="https://joostjacob.github.io/Little/little.js">here</a>.<br>
<br>
Surprises:<br>
To view the function definition of e.g. car you can type "car;" as the last line in the Input Box.<br>
<br>
car(str2sx("(a b c)"), "d");  // -> "a". Should give an error because car has two arguments here but Javascript allows it.<br>
So be very careful to not forget parens in Javascript.<br>
<hr>
If you want to try Scheme:<br>
<a href="https://www.crockford.com/little.html">The Little Javascripter by Douglas Crockford</a> 
is also hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>. You can try Scheme code there in the Input Box.<br>
Unfortunately else is not working in a cond expression, but (gt 2 1) does. I am working on a solution.<br>
<br>
In Scheme a quote character must be a real quote. <br>
On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation".<br>
Or use (define my_atom (quote atom)) and (define my_list (quote '(atom1 atom2))).<br>
<br>
Surprises:<br>
(isList '()): false.