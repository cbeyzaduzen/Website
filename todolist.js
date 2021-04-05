//Tüm Elementleri Seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListener();


function eventListener(){    //Tüm event listenerlar burada tanımlansın.

    form.addEventListener("submit",addTodo);

    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

    secondCardBody.addEventListener("click",deleteTodo);

    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //Arayüzden silme
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
}


function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Silme İşlemi Başarılı...");
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
        addTodotoUI(todo);
    });
}

function addTodo(e){
    const newTodo=todoInput.value.trim();

    if(newTodo===""){
        showAlert("danger","Lütfen yapılacak ekleyin...");
    }
    else{
        addTodotoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Ekleme işlemi başarılı...");
    }
    


    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert=document.createElement("div");

    alert.className='alert alert-${type}';

    alert.textContent=message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },2000);
}

function addTodotoUI(newTodo){
     //List Item oluştruma
    const listItem=document.createElement("li");
    //Link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";

    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo list e list item ekleme
    todoList.appendChild(listItem);
    todoInput.value="";

}