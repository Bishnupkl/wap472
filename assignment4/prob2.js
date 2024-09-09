var bankAccount = {
    money: 2000,
    deposit: function (value) {
        this.money += value;
    }
};
// Explicitly type the myself object
var myself = {
    name: "John",
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
};
myself.bankAccount.deposit(3000);
console.log(myself);
