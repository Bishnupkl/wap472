const getNewArray = function(arr) {
    return arr.filter(str => str.length >= 5 && str.includes('a'));
};

const stringArray = ['apple', 'banana', 'pear', 'mango', 'kiwi','grape'];
console.log(getNewArray(stringArray)); // Output: ['apple', 'banana','mango', 'grape']