# Little books in Javascript?
There is a very nice web-based javascript version of <a href="https://sourceacademy.org/sicpjs/index">
the great SICP textbook</a>.<br>
Can it also be done for 
<a href="https://mitpress.mit.edu/little-books-on-big-topics-in-computer-science/">the Little Books</a>?<br>
<br>
- **The Little Schemer Chapter 1-4 Exercises**: Try them in the [Sandbox 1](https://joostjacob.github.io/Little/toys.html).<br>
Pay attention to str2sx(my_string) and sx2str(my_s_expression) in the example code in the Input Box. 
They are convenience functions for entering and viewing s-expressions. 
If you really want to inspect the Javascript implementation use JSON.stringify(my_s_expression).
- **Chapter 5 and 6**: Use [Sandbox 5](https://joostjacob.github.io/Little/chapter5.html) with solutions from Chapters 2–4 included.
- **Chapter 7 and 8**: Use [Sandbox 7](https://joostjacob.github.io/Little/chapter7.html) with isEqual from Chapter 5 replacing isEq.
- **Chapter 9 and Beyond**: Use [Sandbox 9](https://joostjacob.github.io/Little/chapter9.html) with answers from Chapter 7 and 8 included. 
Solutions for [Chapter 8](https://joostjacob.github.io/Little/chapter8.js) and 
[Chapter 9](https://joostjacob.github.io/Little/chapter9.js).
<br>
<br>
The <a href="https://www.crockford.com/little.html">Little Javascripter by Douglas Crockford</a> has a table 
with transformation rules from Scheme to Javascript. For instance we use null instead of '() in Scheme. 
And cdr(a, s) instead of (cdr a s).<br>
<br>
All primitives (car cdr cons isAtom isEq isNull) from Chapter 1 "Toys" are available in Sandbox 1 so you can do the exercises in Chapter 2 "Do It, Do It Again, and Again, and Again..." and the exercises in Chapter 3 "Cons the Magnificent" and in Chapter 4 "Numbers Games".<br>
Do not use "or" in Chapter 2, instead use || in Javascript. Same for "and" and &&.<br>
<br>
For Chapter 5 "*Oh My Gawd*: It's Full of Stars", you need the solutions from Chapters 1-4, so use Sandbox 5. 
Use isEq(a, b) for non-numeric atoms, isEqn(n, m) for numbers, and isEqan(a, b) for any two atoms. 
Spoiler alert: Chapter 5 brings isEqual(s1, s2), for any two s-expressions.<br>
<br>
All the solutions in Javascript up to Chapter 10 by Douglas Crockford are
<a href="https://joostjacob.github.io/Little/little.js">here</a>.<br>
<br>
Surprises:<br>
To inspect the function code of e.g. car you can type "car;" as the last line in the Input Box.<br>
<hr>
If you want to try Scheme:<br>
<a href="https://www.crockford.com/little.html">The Little Javascripter by Douglas Crockford</a> 
is also hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>. 
You can try Scheme code there in the Input Box. 
Unfortunately else is not working in a cond expression, but #t does. I am working on a solution.<br>
<br>
In Scheme a quote character must be a real quote. <br>
On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation". 
Or use (define my_atom (quote atom)).<br>
<br>
Surprises:<br>
(isList '()): false.