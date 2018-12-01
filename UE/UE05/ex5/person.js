/*
Webtech - Excercise 5.5 - TypeScript 2
Michael Gundacker 1646765
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Helper method invoked by Person.getAge()
function calcAge(birthdate) {
    var timeDiff = Math.abs(Date.now() - birthdate.getTime());
    var age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    return age;
}
var Person = /** @class */ (function () {
    function Person(firstname, lastname, birthdate) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
    }
    Person.prototype.sayHello = function () {
        return "My name is " + this.firstname + " " + this.lastname + ".";
    };
    Person.prototype.getAge = function () {
        return calcAge(this.birthdate);
    };
    return Person;
}());
var Positions;
(function (Positions) {
    Positions[Positions["full professor"] = 0] = "full professor";
    Positions[Positions["adjunct professor"] = 1] = "adjunct professor";
    Positions[Positions["associate professor"] = 2] = "associate professor";
})(Positions || (Positions = {}));
var Professor = /** @class */ (function (_super) {
    __extends(Professor, _super);
    function Professor(firstname, lastname, birthdate, researcharea, pos) {
        var _this = _super.call(this, firstname, lastname, birthdate) || this;
        _this.researcharea = researcharea;
        console.log("constructor: " + pos);
        _this.position = pos;
        return _this;
    }
    Professor.prototype.sayHello = function () {
        return "My name is " + this.firstname + " " + this.lastname + ".";
    };
    Professor.prototype.introduce = function () {
        return this.sayHello() + " I am working in the field of " + this.researcharea + " as " + Positions[this.position] + ".";
    };
    return Professor;
}(Person));
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(firstname, lastname, birthdate, studentNumber) {
        var _this = _super.call(this, firstname, lastname, birthdate) || this;
        _this.studentNumber = studentNumber;
        _this.studyPlans = [];
        return _this;
    }
    Student.prototype.enrol = function (plan) {
        //Study plans can only be enrolled once!
        if (this.studyPlans.indexOf(plan) === -1) {
            this.studyPlans.push(plan);
        }
        else {
            console.log('Attention: Study plan already enrolled!');
        }
    };
    Student.prototype.cancel = function (plan) {
        //Splice(removeIndex, numberOfElementsToRemove) removes from array  
        this.studyPlans.splice(this.studyPlans.indexOf(plan), 1);
    };
    Student.prototype.showStudyPlans = function () {
        var stringOfPlans = '';
        this.studyPlans.forEach(function (plan) {
            stringOfPlans = stringOfPlans + plan.name + ', ';
        });
        return stringOfPlans;
    };
    return Student;
}(Person));
var StudyPlan = /** @class */ (function () {
    function StudyPlan(number, name, expirationDate) {
        this.number = number;
        this.name = name;
        this.expirationDate = expirationDate;
    }
    return StudyPlan;
}());
//Create new Person with birthday 01.01.2010
var myPerson = new Person("Gottfired", "Vossen", new Date('1991-12-06T00:00:00'));
console.log(myPerson.sayHello());
console.log(myPerson.getAge());
var myProfessor = new Professor("Albert", "Einstein", new Date('1955-02-10T00:00:00'), "Physics", Positions["adjunct professor"]);
console.log(myProfessor.sayHello());
console.log(myProfessor.getAge());
console.log(myProfessor.introduce());
var myStudent = new Student("Michael", "Gundacker", new Date('1991-12-06T00:00:00'), 1646765);
var studyPlan1 = new StudyPlan(1, "Webtech", new Date('2018-12-15T00:00:00'));
var studyPlan2 = new StudyPlan(1, "Rechnernetze", new Date('2018-12-17T00:00:00'));
var studyPlan3 = new StudyPlan(1, "Stochastik", new Date('2018-12-20T00:00:00'));
myStudent.enrol(studyPlan1);
myStudent.enrol(studyPlan2);
myStudent.enrol(studyPlan3);
myStudent.cancel(studyPlan2);
myStudent.enrol(studyPlan1);
console.log(myStudent.sayHello());
console.log(myStudent.showStudyPlans());
