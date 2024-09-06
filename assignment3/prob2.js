function sum(arr) {
    return arr.filter(num => num > 20).reduce((acc, num) => acc + num, 0);
}

const numbers = [10, 25, 30, 5, 50];
console.log(sum(numbers)); // Output: 105