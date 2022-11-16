const helper = require('../Helpers/Helper')
    
exports.create = async (req,res) => {
    const responseArray = [];
    const filesData = JSON.parse(req.body.filesData);
    
    for (let key in filesData) {
        let result;

        if (filesData[key] !== null) {

            const fileName = helper.getFileNameFormUrl(filesData[key].url)

            try {
                result = await helper.writeFile(filesData[key].data, fileName, filesData[key].url);
            } 
            catch (e) {
                result = e;
            }

            responseArray.push(result) 
        }    
    }

    res.status(200).send(JSON.stringify(responseArray));
}