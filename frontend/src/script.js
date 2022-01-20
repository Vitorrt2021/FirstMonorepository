const pathLocalHost = 'http://localhost:3004/employees'

sendGet()
addEvent('.button_ramal',()=>sendGet('/ramal'))
addEvent('.button_birthdays',()=>{
    let month = prompt('Mes: ')
    sendGet('/month/'+month)
})
addEvent('.button_sector',()=>{
    let sector = prompt('Setor: ')
    sendGet('/sector/'+sector)
})
addEvent('table',(e)=>{
    const path = e.path
    if(e.target.className === "table_delete_img"){      
        path.map((element)=>{
            if(element.tagName === 'TR'){
                sendDelete(element.id);
            }
        })
    }
})

function addEvent(element,callback,type='click'){
    document.querySelector(element).addEventListener(type,callback)
}


function sendDelete(id){
    const requestOptions={
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }
    request(pathLocalHost+"/"+id,requestOptions)
    sendGet()   
}

function sendGet(path=' '){
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }
    request(pathLocalHost+path,requestOptions,createTable)
}
function createTable(array){
    console.log(array)
    const table = document.querySelector('#result_table')
    table.innerHTML = `              
    <tr class='title_columns'>
        <th><strong>Nome</strong></th>
        <th><strong>Email</strong></th>
        <th><strong>Setor</strong></th>
        <th><strong>Ramal</strong></th>
        <th><strong>Data de Nascimento</strong></th>
        <th><strong>Ações</strong></th>
    </tr>
    `
    if(array.length > 1){
        array.map((obj)=>{
            createLine(obj)
        })
    }
    createLine(array[0])
}
function createLine(obj){
    const line = document.createElement('tr')
 
    line.append(createColumn(obj.name,"name"))
    line.append(createColumn(obj.email,"email"))
    line.append(createColumn(obj.sector,"sector"))
    line.append(createColumn(obj.branch,"ramal"))
    line.append(createColumn(obj.birthDate,"birthDate"))
    line.append(createColumn(` <img src="./assets/icons/remove_circle_black_24dp.svg" class='table_delete_img' alt="Deletar">
    `,'delete'))
    line.setAttribute('id',obj.registrationNumber)
    line.setAttribute('class',"line_object")
    
    const table = document.querySelector('#result_table')
    table.append(line)
}
function createColumn(value,type){
    const column = document.createElement('th')
    column.setAttribute("class", "table_"+type);
    column.innerHTML = value
    return column
}

function request(url,requestOptions,callback){
    fetch(url,requestOptions)
        .then(function(response){
            if(!response.ok) throw new Error("Erro ao executar requisição")
            return response.json()
        })
        .then(function(data){
            if(!data){
                alert('Não a informações valida')
            }else if(callback){
                callback(data)
            }
        })
        .catch(function(error){
            alert(error.message)
        })
}
