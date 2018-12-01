/*
Webtech - Excercise 5.5 - TypeScript 2
Michael Gundacker 1646765
*/

interface PersonI {
	firstname : string;
	lastname : string;
	sayHello() : string;
}

//Helper method invoked by Person.getAge()
function calcAge(birthdate : Date) : number {
	let timeDiff = Math.abs(Date.now() - birthdate.getTime());
	let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
	return age
}

class Person implements PersonI {
	firstname : string
	lastname : string
	birthdate : Date;

	constructor(firstname, lastname, birthdate){
		this.firstname = firstname
		this.lastname = lastname
		this.birthdate = birthdate
	}

	sayHello() : string {
		return `My name is ${this.firstname} ${this.lastname}.`;
	}
	getAge() {
		return calcAge(this.birthdate)
	}
}

enum Positions {'full professor', 'adjunct professor', 'associate professor'}

class Professor extends Person {
	researcharea : string;	
	position : Positions;
	
	constructor(firstname, lastname, birthdate, researcharea, pos: Positions) {
		super(firstname, lastname, birthdate)
		this.researcharea = researcharea;
		console.log("constructor: " + pos)
		this.position = pos
	}
	
	sayHello() : string {
		return `My name is ${this.firstname} ${this.lastname}.`;
	}
	
	introduce() : string {
		return `${this.sayHello()} I am working in the field of ${this.researcharea} as ${Positions[this.position]}.`;
	}
}

class Student extends Person {
	studentNumber : number
	studyPlans : StudyPlan[]

	constructor(firstname, lastname, birthdate, studentNumber){
		super(firstname, lastname, birthdate)
		this.studentNumber = studentNumber
		this.studyPlans = []
	}

	enrol(plan : StudyPlan){
		//Study plans can only be enrolled once!
		if(this.studyPlans.indexOf(plan) === -1){
			this.studyPlans.push(plan)
		}
		else{
			console.log('Attention: Study plan already enrolled!')
		}
	}
	cancel(plan : StudyPlan){
		//Splice(removeIndex, numberOfElementsToRemove) removes from array  
		this.studyPlans.splice(this.studyPlans.indexOf(plan), 1)
	}
	showStudyPlans() : string {
		let stringOfPlans = ''
		this.studyPlans.forEach(plan => {
			stringOfPlans = stringOfPlans + plan.name + ', '
		});
		return stringOfPlans
	}
}

class StudyPlan {
	number : number;
	name : string;
	expirationDate : Date;

	constructor(number, name, expirationDate){
		this.number = number
		this.name = name
		this.expirationDate = expirationDate
	}
}


//Create new Person with birthday 01.01.2010
let myPerson = new Person("Gottfired", "Vossen", new Date('1991-12-06T00:00:00'));
console.log(myPerson.sayHello())
console.log(myPerson.getAge())

let myProfessor = new Professor("Albert", "Einstein", new Date('1955-02-10T00:00:00'), "Physics", Positions["adjunct professor"])
console.log(myProfessor.sayHello())
console.log(myProfessor.getAge())
console.log(myProfessor.introduce())

let myStudent = new Student("Michael", "Gundacker", new Date('1991-12-06T00:00:00'), 1646765)
let studyPlan1 = new StudyPlan(1, "Webtech", new Date('2018-12-15T00:00:00'))
let studyPlan2 = new StudyPlan(1, "Rechnernetze", new Date('2018-12-17T00:00:00'))
let studyPlan3 = new StudyPlan(1, "Stochastik", new Date('2018-12-20T00:00:00'))
myStudent.enrol(studyPlan1)
myStudent.enrol(studyPlan2)
myStudent.enrol(studyPlan3)
myStudent.cancel(studyPlan2)
myStudent.enrol(studyPlan1)
console.log(myStudent.sayHello())
console.log(myStudent.showStudyPlans())
