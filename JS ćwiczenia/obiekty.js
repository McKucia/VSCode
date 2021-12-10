//konstruktor
function Car(brand, model, year) {
    this._brand = brand;
    this._model = model;
    this._year = year;
    this.printInfo = function(){
        console.log(this._brand + " " + this._model + " " + this._year);
    }
}
var autko = new Car('jeep', 'grand cherokee', 1998);
autko.printInfo();

//literał
var brand = 2;
var SomeVariables = {
    a: brand,
    b: 'hello',
    obj: {
        str: 'im inside'
    }
}