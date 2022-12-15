let form =document.getElementById('form');
let msg = document.getElementById('msg');
let textArea = document.getElementById('textArea');
let dateInput = document.getElementById('dateInput');
let textInput = document.getElementById('textInput');
let cancel = document.getElementById('cancel');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');

let data = [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
     formValidation();

})
let showTasks = () => {
  let task = JSON.parse(localStorage.getItem('tasks'));
        tasks.innerHTML = '';
  data.map((item, index) => {
    return (tasks.innerHTML += `
      <div id=${item}>
      <span class="fw-bold">${item.text}</span>
      <span class="small text-secondary">${item.date}</span>
      <p>${item.description}</p>

      <span class="options">
        <!-- edit -->
        <i
          class="bi bi-pencil-square"
          onclick="editTask(this)"
          data-bs-toggle="modal"
          data-bs-target="#form"
        ></i>

        <!-- delete -->
        <i class="bi bi-trash" onclick="deleteTask(this)"></i>
      </span>
    </div>
      
      `);
  });
      resetForm();

};
let resetForm = () => {
  textInput.value = ' ';
  dateInput.value = ' ';
  textArea.value = ' ';
}

let acceptData = () => {
  data.push({
      text: textInput.value,
      date: dateInput.value,
      discription: textArea.value,
  })
 
  localStorage.setItem('tasks', JSON.stringify(data));
  showTasks();
      
  
  
  
  console.log(data);
} 
let formValidation = () => {
    if(textInput.value === ''){
        //fail
        msg.innerHTML = '* task title can not be blank';
    }
    else{
        //success
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();
        //IIFE immideate invoked function expression
        (() => {
            add.setAttribute('data-bs-dismiss', '');

        })();
    }
};

//Delete by button

let deleteTask = (e) => {
   console.log(e.parentElement.parentElement);
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem('tasks', JSON.stringify(data));
 
  console.log(data);
}
 
//Edit task

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
   console.log(selectedTask);
    textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
}

(() => {
  data = JSON.parse(localStorage.getItem('tasks')) || [];
  showTasks();

  })();




