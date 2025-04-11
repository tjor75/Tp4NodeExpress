export default class Alumno {
    constructor(username, dni, edad) {
        this.username = username;
        this.dni = dni;
        this.edad = edad;
    }

    toString() {
        return this.username + " tiene el DNI " + this.dni + " y la edad " + this.edad;
    }
}