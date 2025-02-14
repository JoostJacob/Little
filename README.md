# Little books in javascript?
There is a very nice web-based javascript version of <a href="https://sourceacademy.org/sicpjs/index">
the great SICP textbook</a>.<br>
Can it also be done for 
<a href="https://mitpress.mit.edu/little-books-on-big-topics-in-computer-science/">the Little Books</a>?<br>
<br>
Javascript sandbox <a href="https://joostjacob.github.io/Little/evaljs.html">here</a>.<br>
<br>
<a href="https://www.crockford.com/little.html">The Little Javascripter by Douglas Crockford</a> hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>.<br>
A quote must be a real quote. On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation".<br>
Or use (define my_atom (quote atom)) and (define my_list (quote '(atom1 atom2))).<br>
Tyical usage: (define my_atom 'atom), (define my_list '(atom1 atom2))<br>
<br>
Surprises:<br>
(isList '()): false. This is different from The Little Schemer book p.5 top.<br>
<br>
(isList null): true, (isList (quote ())): false, (isList (quote '())): true, (isNull null): false.<br>
null is already defined in JavaScript and isList is implemented as Array.isArray()<br>
<br>
When calling car or cdr with something else than a non-empty list it does not always return error. 
E.g. (cdr 'hotdog) --> o<br>