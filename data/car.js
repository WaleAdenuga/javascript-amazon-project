class Car {
    #brand; // hidden from child class RaceCar
    #model;
    // if i make speed private, then child class below won't be able to access it for the go override. Normally in java for example, you could declare as protected which can be accessed by child classes but that doesn't exist for javascript
    speed = 0;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        // you access property with this. calling directly does not work
        console.log(`
        ${this.#brand} ${this.#model} ${this.speed} km/h isTrunkOpen ${this.isTrunkOpen}
        `);
    }

    go() {
        if (!this.isTrunkOpen) {
            this.speed += 5;
        }   
        if (this.speed > 200) {
            this.speed = 200;
        }
    }

    brake() {
        this.speed -= 5;
        if(this.speed < 0) {
            this.speed = 0;
        }
    }

    openTrunk() {
        if(!this.speed > 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

for (let index = 0; index < 6; index++) {
    car1.go();
    car2.go();
}
car1.openTrunk();
car1.displayInfo();
car2.displayInfo();

for (let index = 0; index < 6; index++) {
    car1.brake();
    car2.go();
}
car1.openTrunk();
car2.openTrunk();

car1.displayInfo();
car2.displayInfo();

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go() {
        // child class has access to parent properties so we can call this.speed directly
        this.speed += this.acceleration;

        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('No trunk present');
    }

    closeTrunk() {
        console.log('No trunk present');
    }
}

const raceCar = new RaceCar('Mclaren', 'F1', 20);
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();