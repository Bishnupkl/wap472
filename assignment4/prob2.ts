type BankAccount = {
    money: number;
    deposit: (value: number) => void;
};

let bankAccount: BankAccount = {
    money: 2000,
    deposit(value: number): void {
        this.money += value;
    }
};

type Person = {
    name: string;
    bankAccount: BankAccount;
    hobbies: string[];
};

// Explicitly type the myself object
let myself: Person = {
    name: "John",
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
};

myself.bankAccount.deposit(3000);

console.log(myself);
