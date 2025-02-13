# Little
Javascript sandbox <a href="https://joostjacob.github.io/Little/evaljs.html">here</a>.<br>
Little Javascript by Douglas Crockford hosted <a href="https://joostjacob.github.io/Little/ljs.html">here</a>.<br>
A quote must be a real quote. On iPad turn off smart quotes: Go to Settings - General - Keyboard, and toggle off "Smart Punctuation".<br>
Or use (define my_atom (quote atom)) and (define my_list (quote '(atom1 atom2))).<br>
(define my_atom 'atom)<br>
(define my_list '(atom1 atom2))<br>
Surprises:<br>
(isList '()) --> false. But (isList null) --> true and (isList '(() () () ())) --> true.<br>
(car 'hotdog) --> h. But car is only defined for non-empty lists.<br>
(car null) --> error. And (car '()) just does not change the Output at all.<br>
(cdr '(hamburger)) --> (), which is correct. cdr is is only defined for non-empty lists.<br>
(cdr (hamburger)) --> hamburger. Forgotten quote !<br>
(cdr 'hamburger) --> a. Forgotten () !. Output error would be nicer.<br>
(cdr null) --> (null). Output error would be nicer. (cdr '()) does not give a result (behaves like car).
