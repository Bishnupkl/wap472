const stringArray = ['hello', 'professor', 'javascript', 'is', 'fun'];

const result = stringArray.reduce((acc, str) => {
    if (str.length > 5) {
        acc.push(str.toUpperCase());
    }
    return acc;
}, []);

console.log(result); // Output: ['PROFESSOR', 'JAVASCRIPT']