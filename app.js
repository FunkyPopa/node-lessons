const express = require('express');
const fs = require('fs');

const userDB = require('./users/users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000');
});

app.get('/users', async (req, res) => {
      await res.json(userDB);
});


app.post('/users', async (req, res) => {

    const userInfo = req.body;
    console.log(userInfo);

    if(userInfo.name && userInfo.age < 0){
        if(isNaN(userInfo.age)){
           await res.status(412).json('Age must be a number')
        } else {
            await res.status(201).json('Created!');

            let newId = 1;
            const newUser = {id: null, name: `${userInfo.name}`, age: userInfo.age}

            fs.readdir('./users', (err, files) => {
                for (const file of files) {
                    fs.readFile(`./users/${file}`, (err, data) => {
                        const parsedData = JSON.parse(data);
                        parsedData.push(newUser);

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
        }
    } else {
        await res.status(404).json("Name or age doesn't exist");
    }

});

app.get('/users/:userId', async (req, res) => {

    const {userId} = req.params;
    if(userDB[userId - 1]){
        await res.json(userDB[userId - 1]);
    } else {
        await res.status(404).json("This user doesn't exist")
    }


});

app.put('/users/:userId', async (req, res) => {

    const newUserInfo  = req.body;
    const userForUpdate = {id: null, name: `${newUserInfo.name}`, age: newUserInfo.age};
    const { userId } = req.params;

    if(newUserInfo.name && newUserInfo.age < 0){
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
        await res.status(404).json("Name or age doesn't exist");
    }



});

app.delete('/users/:userId', async (req, res) => {

    const { userId } = req.params;
    if(userDB[userId - 1]){

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
                            console.log(item)
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

        await res.status(204).json('Deleted!');
    } else {
        await res.status(404).json("This user doesn't exist");
    }

});
