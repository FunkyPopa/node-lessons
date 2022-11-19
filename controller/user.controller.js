const fs = require("fs");

const userDB = require("../users/users.json");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            await res.json(userDB);
        } catch (e) {
            next(e);
        }

    },

    getById: async (req, res, next) => {
        try {
            await res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const userInfo = req.body;
            console.log(userInfo);

            fs.readdir('./users', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./users/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);
                        parsedData.push(newUser);

                        let newId = 1;
                        const newUser = {id: null, name: `${userInfo.name}`, age: userInfo.age};

                        for (const item of parsedData) {
                            item.id = newId;
                            newId++;
                        }
                        console.log(parsedData);

                        fs.writeFile(`./users/${file}`, JSON.stringify(parsedData), (err) => {
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

        const newUserInfo  = req.body;
        const userForUpdate = {id: null, name: `${newUserInfo.name}`, age: newUserInfo.age};
        const { userId } = req.params;

        if(newUserInfo.name && newUserInfo.age > 0){
            if(isNaN(newUserInfo.age)){

                await res.status(412).json('Age must be a number')

            } else if(userDB[userId - 1]){

                fs.readdir('./users', (err, files) => {
                    for (const file of files) {
                        fs.readFile(`./users/${file}`, (err, data) => {
                            const parsedData = JSON.parse(data);
                            console.log(parsedData);

                            parsedData[userId - 1] = userForUpdate;

                            let newId = 1;
                            for (const item of parsedData) {
                                item.id = newId;
                                newId++;
                            }

                            fs.writeFile(`./users/${file}`, JSON.stringify(parsedData), (err) => {
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

            } else {
                await res.status(404).json("This user doesn't exist");
            }

        } else {
            await res.status(400).json("Name or age is invalid");
        }

    },

    deleteById: async (req, res, next) => {

        const { userId } = req.params;
        if(userDB[userId - 1]){
            await res.status(200).json('Deleted!');
            fs.readdir('./users', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./users/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);

                        const newData = [];
                        let newId = 1;
                        for (const item of parsedData) {
                            if(item.id !== +userId){
                                item.id = newId;
                                newId++;
                                newData.push(item);
                            } else {
                                console.log(item);
                            }

                        }
                        console.log(newData)

                        fs.writeFile(`./users/${file}`, JSON.stringify(newData), (err) => {
                            if (err === null) {
                                console.log("It works!");
                            } else {
                                console.log(err);
                            }
                        });

                    });
                }
            });
        } else {
            await res.status(404).json("This user doesn't exist");
        }

    }

};