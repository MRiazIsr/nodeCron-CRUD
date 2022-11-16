const fs = require('fs').promises;
const fsSync = require('fs');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();


exports.getFileNameFormUrl = (urlStr) => {

    const url = new URL(urlStr);
    
    return path.basename(url.pathname);
}

exports.writeFile = async (fileData, fileName, url, folder = process.env.FOLDER) => {

    const fileNameObj = checkFileExist(folder, fileName, 0)
    const path = folder + fileNameObj.name;

    try {

        if (!fsSync.existsSync(folder)) {

            fsSync.mkdirSync(folder);
        }

      } catch (err) {

            console.error(err);
      }

    const writnigResult = await fs.writeFile(path, fileData)
        .then( (result) => {
            
            saveData(fileNameObj, url, folder);


            return {
                fileName : fileName,
                status : true,
                error : false,
            };
        })
        .catch( (error) => {

            return {
                fileName : fileName,
                status : false,
                error : error,
            };
        });

    return writnigResult;      
}

saveData = (fileNameObj, url, folder, storageName = process.env.STORAGE_NAME) => {

    const saveObj = JSON.stringify({
        fileUrl : url,
        fileName : fileNameObj.name,
        warning : fileNameObj.warning,
        pathToFile : folder + fileNameObj.name
    }) + '\n';

    if ( fsSync.existsSync(storageName) ) { 

        fs.appendFile(storageName, saveObj)
            .then()
            .catch( (error) => {
                console.error(error);
            });
    } else {

        fs.writeFile(storageName, saveObj)
        .then()
        .catch( (error) => {

            console.error(error);
        });   
    }       
}

checkFileExist = (folder, fileName, i) => {

    if (fsSync.existsSync(folder+fileName)) { 

        const fileNameArray = fileName.split('_');

        i++;
        fileName = fileNameArray[0] + '_' + i;

        return checkFileExist(folder, fileName, i);
    } else {

        let warning = false;

        if (i > 0) {
            warning = 'File already exists. Added increment: ' + i; 
        }
        
        return {
            name : fileName,
            warning : warning
        };
    }   
}