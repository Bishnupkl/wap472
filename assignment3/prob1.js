const person = {
    name: 'Bishnu',
    age: 28,
    greet: function() {
        console.log('Hello, my name is ' + this.name+' and i am '+this.age+ 'years old.' );
    }
};

person.greet(); // Hello, my name is Bishnu