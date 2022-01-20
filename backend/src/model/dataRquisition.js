const fs = require('fs')
const dataRequisition = {
    getData(){
        console.log("====================")
        const employees = fs.readFileSync('../backend/data/employees.json','utf-8')
        return JSON.parse(employees) 
    },
    addNewData(newData){
        const oldData = require('../../data/employees.json')
        const newDataObject = [...oldData,newData]
        const newDataString = JSON.stringify(newDataObject,null,2);    
        fs.writeFile('../backend/data/employees.json', newDataString, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    },
    updadeData(data){
        const newDataString = JSON.stringify(data,null,2);    
        fs.writeFile('../backend/data/employees.json', newDataString, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
}

module.exports = dataRequisition