# CRON-CRUD APP 
* This is mixed application for assigment 2
* Here we have cronJob.js, with enviroments, and CRUD Save applictaion
* I made them in one repository just cause I wanted to make cleaner which repository for which task
* Also in git hub I uploaded CRUDSave/files_information.db and CRUDSave/files to show how appliction sacing files and files data

### Technology used in the aplication: ###
* Node.js version 18+
* Expres.js for routing
------------------------------------------------------------------------------------------------------------------ 
### To start the application:
* Clone project from: https://github.com/MRiazIsr/nodeCron-CRUD.git
* Create ".env" files from "env.EXAMPLE" (in root folder and in CRUDSave folder) 
* Run the "npm install" command
* Then "cd CRUDSave && npm install" also
* Then run the "npm run start"
* Open new terminal tab and "cd .."
* Then Run cronJob.js with time parameter - "node cronJob.js * */5 * * * *"
* "* */5 * * * *" means - run task every five minutes, if we need to run it every "n" secods we need to move "/n" to first star, if hourly to the next star 
------------------------------------------------------------------------------------------------------------------    
### API Documentation For CRUD
* Request format: JSON
* Header: Content-type - Application/json

* Create File:<br>  

|        URI       |      TYPE     |    PARAMS     |     REQUIRED     |     DEFAULT    | 
|:----------------:|:-------------:|:-------------:|:----------------:|:--------------:|         
|     /create      |      POST     |      url      |       TRUE       |                |
|                  |               |      data     |       TRUE       |                |