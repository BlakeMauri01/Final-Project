export class Menu {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public url: string,
        public children: Menu[],
    ) { }
}