const isPrime = (n) => {
    return new Promise((resolve, reject) => {
        if (n < 2) return reject({ prime: false });
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) return reject({ prime: false });
        }
        resolve({ prime: true });
    });
};

// Test using async/await
(async () => {
    console.log('start');
    try {
        const result = await isPrime(7);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    console.log('end');
})();
