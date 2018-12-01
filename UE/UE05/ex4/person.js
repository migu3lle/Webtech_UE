/*
Webtech - Excercise 5.4 - TypeScript 1
Michael Gundacker 1646765
*/

/*
Beim Kompilieren von TypeScript wird ein JavaScript File erzeugt
Das JS wird in ECMAScript 3 codiert (für Kompatibilität)
*/

/*
Das Keyword "interface" in TS dient ausschließlich während der
Entwurfszeit als Eingabekorrekur, wird vor dem Kompilieren entfernt
Wirf einen Eingabefehler wenn die Signatur und Implementierung nicht übereinstimmen
*/

var Professor = /** @class */ (function () {
    //Für die Klasse Professor wird eine Konstruktor-Funktion erzeugt
    function Professor(firstname, lastname, researcharea) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.researcharea = researcharea;
    }
    //Die Klassen-Methoden werden an den Protoyp der Professor Instanz  
    Professor.prototype.sayHello = function () {
        return "My name is " + this.firstname + " " + this.lastname + ".";
    };
    Professor.prototype.introduce = function () {
        return this.sayHello() + " I am working in the field of " + this.researcharea;
    };
    return Professor;
}());

//Bei der Instanzierung und Ausführung der Methoden ändert sich nichts
var v = new Professor("Gottfired", "Vossen", "Databases");
console.log(v.sayHello());
console.log(v.introduce());
