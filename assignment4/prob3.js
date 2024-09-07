function describePerson(person) {
    var studentStatus = person.isStudent ? "a student" : "not a student";
    return "".concat(person.name, " is ").concat(person.age, " years old and is ").concat(studentStatus, ".");
}
var person = { name: "Alice", age: 25, isStudent: true };
console.log(describePerson(person)); // Output: "Alice is 25 years old and is a student."
