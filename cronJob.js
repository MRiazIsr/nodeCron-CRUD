const cron = require("node-cron");
const express = require("express");
const axios = require('axios');
const app = express();

cron.schedule(process.argv[2], async () => {
  
    const filesData = await getFiles().then((result) => {
        if (result !== undefined) {  
            return result;
        } 
    });

    


});

getFiles = async () => {
    const url = 'https://cfrkftig71.execute-api.us-east-1.amazonaws.com/prod?expert=true';

    const res = await axios.get(url)
        .then( async (response) => { 
            const result = await Promise.all(response.data.map( async (element) => {
                let test;

                try {
                    test = await parseResult(element);
                } catch (e) {

                }
                //console.log('TEST', test)
                return test;
            }));
            
            //console.log( result);
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

                let buffer = new Buffer.from(res.data);
                let base64data = buffer.toString('base64');

                return {
                    data : base64data,
                    url : data
                };  
            });
        //console.log(fileData)        
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