# Little
Javascript sandbox <a href="https://joostjacob.github.io/Little/evaljs.html">here</a>.<br>
Little Javascript by Douglas Crockford hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>.<br>
A quote must be a real quote. On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation".<br>
Or use (define my_atom (quote atom)) and (define my_list (quote '(atom1 atom2))).<br>
Tyical usage: (define my_atom 'atom), (define my_list '(atom1 atom2))<br>
Surprises:<br>
(isList null) --> true. (isList '()) --> false.<br>
(isList (quote ())) --> false. (isList (quote '())) --> true.<br>
When calling car or crd with something else than a non-empty list it does not always return error. 
E.g. (cdr 'hotdog) --> o<br>