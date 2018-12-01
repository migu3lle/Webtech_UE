/*
Webtech Übung 4.1 - Michael Gundacker
*/
/*
let greet =
    gender =>
        name =>
            'Dear ' + (gender === 'female' ? 'Mrs. ' : 'Mr. ') + name;

let women = ['Susan', 'Karen', 'Amanda'];
let greetWoman = greet('female');
for(let w of women)
    console.log(greetWoman(w));
*/

//--------------------- ident zu ----------------------------------
//Schreibweise laut VO wäre wie folgt.
//Dem "greet" wird eine Funktion mit Rückgabewert zugeordnet
//gender ist input für den ersten return
//name ist input für den innersten return
//Return: Wenn gender == 'female', dann 'Mrs. ', sonst 'Mr. '
let greet = 
    gender => 
        {return name =>
            {return 'Dear ' + (gender === 'female' ? 'Mrs. ' : 'Mr. ') + name;}}

//Man könnte das ganze auch so schreiben:
/*
let greet = function(gender){
    return function(name){
        return 'Dear ' + (gender === 'female' ? 'Mrs. ' : 'Mr. ') + name;
    }
}
*/

//Array mit String Namen
let women = ['Susan', 'Karen', 'Amanda'];

//greet wurde oben eine Funktion zugewiesen
//greetWoman wird hier eine Funktion zugewiesen, welche die Funktion
//greet() mit Parameter 'female' enthält
let greetWoman = greet('female');
for(let w of women)
    console.log(greetWoman(w));

/*
Ausgabe:
Dear Mrs. Susan
Dear Mrs. Karen
Dear Mrs. Amanda
*/