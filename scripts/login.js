function checkIfAnyRoleIsChecked(){

    let list = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of list) {
        
        if(radioButton.checked === false){
            counter++;
        }
    }

    return counter !== list.length;
}



function cadastrar(){
    
    
    // Válida se foi seleciona o tipo de perfil
    if(!checkIfAnyRoleIsChecked()){
        Swal.fire({
            title: "Algo deu errado!",
            text: "Selecione o tipo de perfil!",
            icon: "error"
          });
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'client',
        fullName: document.querySelector("#fullName").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value        
    }

    // ENVIAR PARA API

    fetch("https://6781509585151f714b0a4176.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers:{
            //'user': 'teste',
            //'auth': 'token',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        // Redirect para Listagem
        localStorage.setItem("userName", response.fullName);
        localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");
        localStorage.setItem("idClient", response.id); // usuário logado

          Swal.fire({
            title: "Bom trabalho!",
            text: "Cadastro realizado com Sucesso!",
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