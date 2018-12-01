/*
Webtech Übung 4.1 - Michael Gundacker
*/

//Globale Variablen können mittels Closure privat gemacht werden

function createCounter() {
    let counter = 0;
    let incFunction = function() {
        counter += 1;
        return counter;
    }
    return incFunction;
}

//Die Variable increment erhält den Rückgabewert von createCounter()
//Der Rückgabewert ist die Funktion incFunction()
//Dadurch wird increment eine Funktion = Closure
const increment = createCounter();

//Über die Funktion increment() kann die "globale Variable" counter
//erhöht werden, ohne dass diese sich im globalen Scope befindet
const c1 = increment();
const c2 = increment();
const c3 = increment();
console.log('result:', c1, c2, c3);
//Output: 1 2 3