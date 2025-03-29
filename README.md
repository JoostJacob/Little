# Little books in Javascript?
There is a very nice web-based javascript version of <a href="https://sourceacademy.org/sicpjs/index">
the great SICP textbook</a>.<br>
Can it also be done for 
<a href="https://mitpress.mit.edu/little-books-on-big-topics-in-computer-science/">the Little Books</a>?<br>
- **The Little Schemer Chapter 1-4 Exercises**: Try them in the [Sandbox 1](https://joostjacob.github.io/Little/toys.html).<br>
Pay attention to str2sx(my_string) and sx2str(my_s_expression) in the example code in the Input Box. 
They are convenience functions for entering and viewing s-expressions.<br> 
On iPad if you key BackSpace the highlighted example code will disappear. 
If you key Command+Arrow-Down it will stay and you can add or change code.<br>
Use the return statement to make results appear in the Output Box. If you return the name of a function it's definition will appear in code. Works great if you want to look up how a function is defined!
<br>
Solutions for
[Chapter 2](https://joostjacob.github.io/Little/chapter2.js) and 
[Chapter 3](https://joostjacob.github.io/Little/chapter3.js) and 
[Chapter 4](https://joostjacob.github.io/Little/chapter4.js).<br>

- **Chapter 5 and 6**: Use [Sandbox 5](https://joostjacob.github.io/Little/chapter5.html) with solutions from Chapters 2–4 included.
Solutions for [Chapter 5](https://joostjacob.github.io/Little/chapter5.js) and 
[Chapter 6](https://joostjacob.github.io/Little/chapter6.js).<br>

- **Chapter 7 and 8**: Use [Sandbox 7](https://joostjacob.github.io/Little/chapter7.html) with isEqual from Chapter 5 replacing isEq.
Solutions for [Chapter 7](https://joostjacob.github.io/Little/chapter7.js) and 
[Chapter 8](https://joostjacob.github.io/Little/chapter8.js).<br>

- **Chapter 9 and Beyond**: Use [Sandbox 9](https://joostjacob.github.io/Little/chapter9.html) with answers from Chapter 7 and 8 included. 
Solutions for [Chapter 9](https://joostjacob.github.io/Little/chapter9.js) and 
[Chapter 10](https://joostjacob.github.io/Little/chapter10.js).<br> 
And of course a little Scheme [interpreter](https://joostjacob.github.io/Little/scheme10.html), 
without define, just like in the book.<br>

- **From The Seasoned Schemer**: here is [Chapter 11](https://joostjacob.github.io/Little/chapter11.js),  
[Chapter 12](https://joostjacob.github.io/Little/chapter12.js) and 
[Chapter 13](https://joostjacob.github.io/Little/chapter13.js).<br>

<br>
The <a href="https://www.crockford.com/little.html">Little Javascripter by Douglas Crockford</a> has a table 
with transformation rules from Scheme to Javascript. For instance we use null instead of '() in Scheme. 
And cdr(a, s) instead of (cdr a s).<br>
<br>
All primitives (car cdr cons isAtom isEq isNull) from Chapter 1 "Toys" are available in the Sandboxes.<br>
Do not use "or" in Chapter 2, instead use || in Javascript. Same for "and" and &&.<br>
<br>
<hr>
If you want to try Scheme there is a great site at <a href="https://try.scheme.org">Try Scheme</a>.<br>
<br>
On iPad turn off smart quotes if you want to code in Scheme: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation". 
Or use (define my_atom (quote atom)).<br>
<br>
