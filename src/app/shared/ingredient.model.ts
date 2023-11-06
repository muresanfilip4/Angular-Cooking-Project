//Shortcut to exporting a class and initializing a constructor --> by adding "public" in front of constructor parameters
//Same as:
// export class Ingredient {
//     public name: string;
//     public amount: number;

//     constructor(name: string, amount: number) {
//         this.name = name;
//         this.amount = amount;
//     }
// }

export class Ingredient {
    constructor(public name: string, public amount: number) {}
}