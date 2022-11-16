const cron = require("node-cron");
const express = require("express");
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

cron.schedule(process.argv[2], async () => {
    
    const filesData = await getFiles().then((result) => {
        if (result !== undefined) {  
            return result;
        } else {
            return false;
        }
    });
    const crudURL = process.env.CRUD_URL + '/create';

    if (filesData) {
       
        const res = await axios.post(crudURL, {
            filesData: JSON.stringify(filesData),
        })
            .then( (response) => {
                console.log(response.data);
            });   
    }
});

getFiles = async () => {
    const url = process.env.API_URL;
    const res = await axios.get(url)
        .then( async (response) => { 
            const result = await Promise.all(response.data.map( async (element) => {
                
                let fileData;

                try {
                    fileData = await parseResult(element);
                } catch (e) {

                }

                return fileData;
            }));
            
            return result;
            
        })
        .catch((error) => {
            
            return undefined;
    });

    return res;
}

parseResult = async (data) => {

    if (typeof(data) === 'string') {

        let fileData = await axios.get(data)
            .then( (res) => {

                return {
                    data : res.data,
                    url : data
                };  
            });
            
            return fileData;
    }

    for (let key in data) {
    
        element = data[key];

        return parseResult(element);
        
    }     
}

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});