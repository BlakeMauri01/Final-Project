export class Icecream {
    constructor(
        public id: string,
        public name: string,
        public flavor: string,
        public toppings: string,
        public imageUrl: string,
        public group: Icecream[],
    ) { }
}