const fs = require("fs");

const carDB = require("../DB/cars/cars.json");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            await res.json(carDB);
        } catch (e) {
            next(e);
        }

    },

    getById: async (req, res, next) => {
        try {
            await res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const carInfo = req.body;
            console.log(carInfo);

            const newCar = {id: null, name: `${carInfo.model}`, year: carInfo.year, price: carInfo.price};

            fs.readdir('./DB/cars', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./DB/cars/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);
                        parsedData.push(newCar);

                        let newId = 1;
                        for (const item of parsedData) {
                            item.id = newId;
                            newId++;
                        }
                        console.log(parsedData);

                        fs.writeFile(`./DB/cars/${file}`, JSON.stringify(parsedData), (err) => {
                            if (err === null) {
                                console.log("It works!");
                            } else {
                                console.log(err);
                            }
                        });

                    });
                }
            });

            await res.status(201).json('Created!');
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const newCarInfo  = req.body;
            const carForUpdate = {id: null, model: `${newCarInfo.model}`, year: newCarInfo.year, price: newCarInfo.price};
            const { carId } = req.params;


            fs.readdir('./DB/cars', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./DB/cars/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);
                        console.log(parsedData);

                        parsedData[carId - 1] = carForUpdate;

                        let newId = 1;
                        for (const item of parsedData) {
                            item.id = newId;
                            newId++;
                        }

                        fs.writeFile(`./DB/cars/${file}`, JSON.stringify(parsedData), (err) => {
                            if (err === null) {
                                console.log("It works!");
                            } else {
                                console.log(err);
                            }
                        });

                    });
                }
            });

            await res.status(201).json('Updated');
        } catch (e) {
            next(e);
        }



    },

    deleteById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            fs.readdir('./DB/cars', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./DB/cars/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);

                        const newData = [];
                        let newId = 1;
                        for (const item of parsedData) {
                            if(item.id !== +carId){
                                item.id = newId;
                                newId++;
                                newData.push(item);
                            } else {
                                console.log(item);
                            }

                        }
                        console.log(newData)

                        fs.writeFile(`./DB/cars/${file}`, JSON.stringify(newData), (err) => {
                            if (err === null) {
                                console.log("It works!");
                            } else {
                                console.log(err);
                            }
                        });

                    });
                }
            });

            await res.status(200).json('Deleted!');
        } catch (e) {
            next(e);
        }

    }
};