function add1(x) { return x+1; }
function times10(x) { return x*10; }
document.getElementById("resultDiv").innerHTML=add1(add1(times10(4)));

