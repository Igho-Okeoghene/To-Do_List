//declare the array
let arr = [];
showTodo();
//push the objects in the array
function addEntry(){
    var todo = document.getElementById('input').value;
    var obj = {
    'task' : todo
    }
  //check if input field is empty
    if(todo !== ""){
        createHTML(todo);
        arr.push(obj);
        arrUpdate();
        document.getElementById("input").value = "";
    }else{
        document.getElementById("input").value = "";
    }
};

//when the add button is clicked
document.getElementById("addButton").addEventListener("click", addEntry);
window.addEventListener('keydown',(e) => {
    if(e.which == 13 || e.keycode == 13){ 
        addEntry();
    }
});
//check if local storage is empty on load
function showTodo(){
    var storage = localStorage.getItem('todoList');
    if(storage !== null){
       var arr2 = JSON.parse(storage);
        for(var i = 0; i < arr2.length; i++){
        var firstValue = arr2[i];
        let value = firstValue.task;
        createHTML(value);
        arr.push(firstValue)
    }
}
};
//update the array
function arrUpdate() {
    localStorage.setItem('todoList', JSON.stringify(arr))
    };

//create elements in the html
function createHTML(todo){
    var list = document.getElementById('list');

    var li = document.createElement('li');

    var dValue = document.createElement('input');
    dValue.classList.add('input');
    dValue.value = todo;
    dValue.disabled = true;

    var check = document.createElement('button');
    check.classList.add('check');
    check.innerHTML = `<i class="fa fa-check-circle-o" aria-hidden="true"></i>`;
  
    check.addEventListener("click", message)
    function message(){
        check.classList.add('done');
        alert("NICE JOB!!")
    };

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = `<i class="fa fa-pencil-square" aria-hidden="true"></i>`;

    //eventListener to edit a todo
    edit.addEventListener('click', editTodo);
    function editTodo(){
        let saveInput = document.getElementById("saveInput");
        let addButton = document.getElementById("addButton");
        let savebtn = document.getElementById("savebtn");
        let input = document.getElementById('input');
        let elem = dValue.value;

        //remove the edit from the arr
        var obj = {
          'task': elem
       };
        for(var i = arr.length - 1; i>=0; i--){
           if(arr[i]['task'] === obj['task'])
         arr.splice(i,1);
         localStorage.setItem('todoList', JSON.stringify(arr));
        }
       
        saveInput.value = elem;
        addButton.style.display = "none";
        input.style.display ="none";
        saveInput.style.display = "block";
        savebtn.style.display = "block";
        
      //remove the edit from the app
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        parent.removeChild(item);
    };


    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true">`;

    //eventListener to remove a todo
    remove.addEventListener('click', removeTodo);
    
    function removeTodo(todo){
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        parent.removeChild(item);
       todo = dValue.value;
       var obj = {
          'task': todo
       };
       for(var i = arr.length - 1; i>=0; i--){
           if(arr[i]['task'] === obj['task'])
           arr.splice(i,1);
       }
       localStorage.setItem('todoList', JSON.stringify(arr));
    };

    //append all elements to the html
    buttons.appendChild(edit);
    buttons.appendChild(remove);
    li.appendChild(buttons);
    li.appendChild(check);
    li.appendChild(dValue);
    //adds an amazing feature of adding the elements above each other and not below.
    list.insertBefore(li, list.childNodes[0]);
}

    //save todo button
    let savebtn = document.getElementById("savebtn");
    savebtn.addEventListener("click", saveEntry);
    window.addEventListener('keydown',(e) => {
        if(e.which == 13 || e.keycode == 13){
            saveEntry();
        }
    });
    
  function saveEntry(){
        let elem = document.getElementById('saveInput').value;
        var obj = {
            'task': elem
         };
      
        if(elem !== ""){
           createHTML(elem);
            arr.push(obj);
            arrUpdate();
            
        }
           // localStorage.setItem('todoList', JSON.stringify(arr));
            addButton.style.display = "block";
            input.style.display ="block";
            saveInput.style.display = "none";
            savebtn.style.display = "none";
            document.getElementById("input").value = "";
        
    };
