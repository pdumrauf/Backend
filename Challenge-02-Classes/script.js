class Usuario {
    constructor (name, lastName, books = [], pets = []) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    addPet(petName) {
        this.pets.push(petName)
    }

    countPets() {
        return this.pets.length
    }

    addBook(name, author) {
        const book = {
            name,
            author
        }
        this.books.push(book)
    }

    getBookNames() {
        return this.books.map( book =>  book.name )
    }
}

const user = new Usuario('Ramiro', 'Rodriguez', [{name: 'Harry Potter', author: 'J.K. Rowling'}], ['Apollo', 'Pocho', 'Luna']);

console.log(user.countPets());
console.log(user.getFullName());
console.log(user.getBookNames());
user.addBook('El señor de los anillos', 'fulanito');
console.log(user.getBookNames());
user.addPet('Jengibre');
console.log(`Cantidad de mascotas: ${user.countPets()}`);
