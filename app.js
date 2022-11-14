const fs = require('fs');

fs.readdir('./boys', {withFileTypes: true},(err, files) => {
    for (const file of files) {
        if (file.isDirectory()) {
                console.log(file);
        } else fs.readFile(`./boys/${file.name}`, (err, data) => {
          const parsedData = JSON.parse(data);
           if (parsedData.gender === "female") {
                fs.rename(`./boys/${file.name}`, `./girls/${file.name}`, (err) => {
                    console.log(err);
                });
             }
          });
    }
});


fs.readdir('./girls', {withFileTypes: true},(err, files) => {
    for (const file of files) {
        if (file.isDirectory()) {
            console.log(file);
        } else fs.readFile(`./girls/${file.name}`, (err, data) => {
            const parsedData = JSON.parse(data);
            if (parsedData.gender === "male") {
                fs.rename(`./girls/${file.name}`, `./boys/${file.name}`, (err) => {
                    console.log(err);
                });
            }
        });
    }
});