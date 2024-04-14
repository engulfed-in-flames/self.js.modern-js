"use strict";

/////////////////////////
////////// OOP //////////
/////////////////////////

console.log("////////// Function Constructor //////////");
(() => {
  // Class in ES6 is syntactic sugar for function constructor.
  // When calling function constructor...
  // 1. New {} is created
  // 2. Function is called → this = {};
  // 3. {} linked to prototype ✅
  // 4. Function automatically return {}
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Do NOT create a method inside of the function constructor.
    // Each instance will have each method, which is not efficient.
  };

  const john = new Person("John", 1997);
  console.log(john);
  console.log(john instanceof Person);

  ////////// Prototypes //////////
  // Prototypal Inheritance: Every instance inherits its own prototype.
  Person.prototype.calcAge = function () {
    console.log(2024 - this.birthYear);
  };
  // DELEGATION
  john.calcAge(); // john.__proto__.calcAge()

  console.log(Person);
  console.log(Person.prototype);
  console.log(john.__proto__);
  console.log(Person.prototype === john.__proto__);
  console.log(Person.prototype.isPrototypeOf(john));
  // .prototype is NOT of Person, BUT an object created by Person
  console.log(Person.prototype.isPrototypeOf(Person));

  Person.prototype.species = "Homo Sapiens";
  console.log(john.species);

  console.log(john.hasOwnProperty("firstName"));
  console.log(john.hasOwnProperty("species"));
  console.log(john.__proto__.hasOwnProperty("species"));

  ////////// Prototypal Inheritance & Prototype Chain //////////
  console.log(john.__proto__.__proto__); // Object.prototype
  console.log(john.__proto__.__proto__.__proto__);

  console.dir(Person.prototype.constructor);

  const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  console.log(arr.__proto__ === Array.prototype);

  Array.prototype.unique = function () {
    return [...new Set(this)];
  };

  // Adding methods directly in prototype is NOT recommended
  console.log(arr.unique());
})();

console.log("////////// Class //////////");

(() => {
  // 1. All methods in class follow prototypal inheritance
  // 2. Classes are NOT hoisted; Do NOT use before its declaration.
  // 3. Classes are first-class citizens which means that class can be used as argument or return value.
  // 4. Classes are executed in strict mode even without the "use strict" directive.

  // Class Declaration
  class Person {
    constructor(fullname, birthYear) {
      this.fullname = fullname;
      this.birthYear = birthYear;
    }

    calcAge() {
      console.log(2024 - this.birthYear);
    }

    greet() {
      console.log(`Hello! My name is ${this.fullname}`);
    }

    get age() {
      return 2024 - this.birthYear;
    }

    get fullname() {
      return this._fullname;
    }

    // ↓ NOT used often
    // Set a property that already exists
    set fullname(name) {
      // if (name.includes(" ")) this.fullname = name; ❌ Cause conflict.
      if (name.includes(" ")) this._fullname = name;
      else alert(`${name} is not a full name!`);
    }

    // ---- ---- Static Method ---- ----
    static hey() {
      console.log("Hey there👋");
      console.log(this);
    }
  }

  const jessica = new Person("Jessica Davis", 1996);
  console.log(jessica);
  console.log(jessica.__proto__);
  console.log(jessica.__proto__ === Person.prototype);

  jessica.greet();

  console.log(jessica.age);
  console.log(jessica.fullname);
  console.log(jessica._fullname);

  Person.hey();
})();

console.log("////////// Getters & Setters //////////");
(() => {
  // Work in any regular JS objects
  const account = {
    owner: "John",
    movements: [200, -530, 120, 300],

    get latest() {
      // return this.movements.slice(-1).pop();
      return this.movements.at(-1);
    },

    set latest(mov) {
      this.movements.push(mov);
    },
  };

  console.log(account.latest);
  account.latest = 50; // Confusing
  console.log(account.movements);
})();

console.log("////////// Object Constructor //////////");
(() => {
  // The least used way to create Class-like
  // 💡 But crucial when implementing class-inheritance
  const PersonProto = {
    calcAge() {
      console.log(2024 - this.birthYear);
    },

    // ENTIRELY NOT constructor
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const steven = Object.create(PersonProto);
  console.log(steven);
  steven.name = "Steven";
  steven.birthYear = 2002;
  steven.calcAge();

  console.log(steven.__proto__ === PersonProto);

  const sarah = Object.create(PersonProto);
  sarah.init("Sarah", 1979);
  console.log(sarah);
})();

console.log("////////// Inheritance Behind The Scenes //////////");
(() => {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.calcAge = function () {
    return console.log(2024 - this.birthYear);
  };

  const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
  };

  console.log(Student.prototype);

  Student.prototype = Object.create(Person.prototype);
  console.log(Student.prototype);

  Student.prototype.constructor = Student;
  console.log(Student.prototype);

  Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I studied ${this.course}`);
  };

  const mike = new Student("Mike", 2000, "Computer Science");
  console.log(mike);
  console.log(mike instanceof Student);
  console.log(mike instanceof Person);
  console.log(mike instanceof Object);
  mike.introduce();
  mike.calcAge();
})();

console.log("////////// Inheritance In ES6 //////////");
(() => {
  class Person {
    constructor(fullname, birthYear) {
      this.fullname = fullname;
      this.birthYear = birthYear;
    }

    calcAge() {
      console.log(2024 - this.birthYear);
    }

    greet() {
      console.log(`Hello! My name is ${this.firstName}`);
    }

    get age() {
      return 2024 - this.birthYear;
    }

    // ↓ NOT used often
    // Set a property that already exists
    set fullname(name) {
      // if (name.includes(" ")) this.fullname = name; ❌ Cause conflit
      if (name.includes(" ")) this._fullname = name;
      else alert(`${name} is not a full name!`);
    }

    get fullname() {
      return this._fullname;
    }

    // ---- ---- Static Method ---- ----
    static hey() {
      console.log("Hey there👋");
      console.log(this);
    }
  }

  class Student extends Person {
    constructor(fulllName, birthYear, course) {
      super(fulllName, birthYear);
      this.course = course;
    }

    calcAge() {
      console.log("Overrided");
    }
  }
})();

console.log("////////// Inheritance Between Classes: Object.create //////////");
(() => {
  const PersonProto = {
    calcAge() {
      console.log(2024 - this.birthYear);
    },

    // ENTIRELY NOT constructor
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const StudentProto = Object.create(PersonProto);
  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };

  StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };

  const jay = Object.create(StudentProto);
  console.log(jay.__proto__ === StudentProto);
  console.log(jay.__proto__.__proto__ === PersonProto);

  jay.init("Jay", 1983, "Computer Science");
  jay.introduce();
  console.log(jay);
})();

console.log("////////// Another Class Example //////////");
(() => {
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this._pin = pin; // Convention for protected properties;
      this._movements = [];
      this.locale = navigator.language;

      console.log(`Thanks for opening an account, ${owner}`);
    }

    // Public interface
    getMovements() {
      return this._movements;
    }

    deposit(val) {
      typeof val === "number" && this._movements.push(val);
    }

    withdraw(val) {
      typeof val === "number" && this.deposit(-val);
    }

    _approveLoan(val) {
      return true;
    }

    requestLoan(val) {
      this._approveLoan(val) && this.deposit(val);
    }
  }

  const acc1 = new Account("Jonas", "EUR", 1111);
  console.log(acc1);
})();

console.log("////////// The Future of The Class //////////");
(() => {
  class Account {
    // Public fields; Exist in the instance, NOT in its prototype
    locale = navigator.language;

    // Private fields; Truly NOT accessible from outside
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;

      console.log(`Thanks for opening an account, ${owner}`);
    }

    // Public methods
    // Public interface
    getMovements() {
      return this.#movements; // Accessible to private fields
    }

    deposit(val) {
      typeof val === "number" && this.#movements.push(val);
      return this;
    }

    withdraw(val) {
      typeof val === "number" && this.deposit(-val);
      return this;
    }

    _approveLoan(val) {
      return typeof val === "number";
    }

    requestLoan(val) {
      this._approveLoan(val) && this.deposit(val);
      return this;
    }

    // Private methods (Currently, handled as same as private fields)
    // #approveLoan(val) {
    //   return true;
    // }
  }

  const acc1 = new Account("Jonas", "EUR", 1111);
  console.log(acc1);
  // console.log(acc1.#movements);

  acc1.deposit(1500).withdraw(1000).requestLoan(10000).withdraw(5000);
  console.log(acc1.getMovements());
})();
