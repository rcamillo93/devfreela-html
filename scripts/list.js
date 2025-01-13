
let list=[];

window.onload = function () {
    
  document.querySelector("#name").innerText = localStorage.getItem("userName");
  document.querySelector("#role").innerText = localStorage.getItem("role");

  getProjects();
};

function getProjects() {

  fetch("https://6781509585151f714b0a4176.mockapi.io/api/projects")
    .then((response) => response.json())
    .then((response) => { 

        list = response;
        buildTable();
    });
}

function buildTable(){

    document.querySelector("#table-body").innerHTML = "";

    const idClient = localStorage.getItem('idClient'); 

    list = list.filter(item => item.idClient === idClient);

    list.forEach(item => {
        
        let template = 
            `<div class="row">
                <div class="title-description">
                    <h6 class="title">${item.title}</h6>
                    <p class="description">${item.description}</p>
                </div>
                <div class="price">${item.totalCost}</div>
                    <div class="actions">
                        <span class="edit material-icons" onclick="goToEdit(${item.id})">edit</span>
                        <span class="delete material-icons" onclick="deleteProject(${item.id})">delete_outline</span>
                    </div>
            </div>`;
    
            document.querySelector("#table-body").insertAdjacentHTML("beforeend", template);
    
        }); 
}

function goToEdit(id){

    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id){

    fetch(`https://6781509585151f714b0a4176.mockapi.io/api/projects/${id}`, {
        method: 'DELETE' 
    })
    .then(response => response.json())
    .then(response => {
   
         list = list.filter(project => project.id != id);
         buildTable();
    });
}