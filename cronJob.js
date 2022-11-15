const cron = require("node-cron");
const express = require("express");
const axios = require('axios');
const app = express();

cron.schedule(process.argv[2], function () {
  
    const files = getFiles().then((result) => {
        if (result !== undefined) {   
            const res2 = Promise.all(result).then( (response) => {
                console.log(response)
            });
        } 
    });

});

getFiles = async () => {
    const url = 'https://cfrkftig71.execute-api.us-east-1.amazonaws.com/prod?expert=true';

    const res = await axios.get(url)
        .then( (response) => { 
            const result = response.data.map( (element) => {
                return parseResult(element);
            });

            return result;
            
        })
        .catch((error) => {

            console.log(error);
            console.log('we are here fail');
            //res.status(500).send(error);
    });

    return res;
}

parseResult = (data) => {
    if (typeof(data) === 'string') {

        let fileData = axios.get(data)
            .then( (res) => {

                let buffer = new Buffer.from(res.data);
                let base64data = buffer.toString('base64');

                return {
                    data : base64data,
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

app.listen(3000, () => {
  console.log("application listening.....");
});