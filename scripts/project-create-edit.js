   // Pega os parametros da url
   const urlSearchParams = new URLSearchParams(window.location.search);
   const params = Object.fromEntries(urlSearchParams.entries());

   // Type: 'create' | 'edit'
   const screenType = params.id ? 'edit' : 'create';

window.onload = function(){
     
    setScreenTypeText();
    fillInputs();
 
}

function fillInputs(){

    if(screenType === 'edit'){
        fetch(`https://6781509585151f714b0a4176.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector("#title").value = project.title;
            document.querySelector("#totalCost").value = project.totalCost;
            document.querySelector("#description").value = project.description;
        })
    }
}

function setScreenTypeText(){
    
    // MODO CRIAR
    if(screenType == 'create') {

        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";

    }     
    // MODO EDITAR
    if(screenType == 'edit'){

       document.querySelector('#main-title').innerText = "Editar projeto";
       document.querySelector('#action-button').innerText = "Salvar";
    } 


}

function createOrEdit(){

    let payload = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem("idClient")
    }

    // ENVIAR PARA API

    fetch(`https://6781509585151f714b0a4176.mockapi.io/api/projects${screenType === 'edit' ? `/${params.id}` : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers:{
            //'user': 'teste',
            //'auth': 'token',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
       //console.log(response);
       let msg = screenType === 'edit' ? 'Projeto alterado com Sucesso!' : 'Projeto cadastrado com Sucesso';
       
       Swal.fire({
        title: "Bom trabalho!",
        text: msg,
        icon: "success", 
        confirmButtonText: "Ok!"
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "list.html"; 
        }
      });      
    });
   // .catch(error => {
    //})
}
