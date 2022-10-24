MainDiv = document.getElementById("Main_div");
TaskForm = document.getElementById("taskForm");
AddTaskBtn = document.getElementById("AddTaskBtn");
DeleteAllBtn = document.getElementById("DeleteAll");

DivPrueba = document.getElementById("div_pruebaa");

let Old_TaskData = JSON.parse(localStorage.getItem("Tasks"));
let new_TaskData = {};

window.addEventListener("DOMContentLoaded", () => {
  if (Old_TaskData === null) {
    localStorage.setItem("Tasks", "[]");
    Old_TaskData = JSON.parse(localStorage.getItem("Tasks"));
  } else {
    ReadAllTasks();
  }
});

DivPrueba.addEventListener("click", (e) => {
  e.preventDefault();
  let taskID = parseFloat(e.target.classList[0]);
  let DivID = "id_" + e.target.classList[0];
  const PrintPendientTasks = Old_TaskData.filter((item) => item.id !== taskID);

  //console.log(taskID)

  if(Old_TaskData.lenght != 0){
    Old_TaskData = localStorage.setItem("Tasks",JSON.stringify(PrintPendientTasks))
  }else{
    localStorage.setItem("Tasks", "[]");
  }

  Old_TaskData = JSON.parse(localStorage.getItem("Tasks"));

  InsertDivAnimation = document.getElementById(`${DivID}`)
  InsertDivAnimation.classList.add('fadeOut')

  setTimeout(() => {
    document.getElementById(`${DivID}`).remove()
  }, 500);
;

  //console.log("Elemento Borrado");
  //console.log(Old_TaskData)
});

const AddNewTaskAnimation = (id,title,description,date) =>{
  const TaskDiv = document.createElement("div");
    TaskDiv.setAttribute("id", "id_" + id);
    TaskDiv.classList.add('fadeIn')
 
    const h1Title = document.createElement("h2");
    h1Title.textContent = title;

    const pDescrip = document.createElement("p");
    pDescrip.textContent = description;

    const pDate = document.createElement("p");
    pDate.textContent = date;

    const DelTask = document.createElement("button");
    DelTask.textContent = "";
    DelTask.classList.add(id);
    DelTask.classList.add("DeleteTaskBtn");
    DelTask.classList.add('mdl-button')
    DelTask.classList.add('mdl-js-button')
    DelTask.classList.add('mdl-button--fab')
    DelTask.classList.add('mdl-button--mini-fab')

    const DelBtnIcon = document.createElement("i")
    DelBtnIcon.classList.add('material-icons')
    DelBtnIcon.classList.add('Trash-icon')
    DelBtnIcon.textContent = "delete"

    DelTask.appendChild(DelBtnIcon)
    TaskDiv.appendChild(h1Title);
    TaskDiv.appendChild(pDescrip);
    TaskDiv.appendChild(pDate);
    TaskDiv.appendChild(DelTask);

    DivPrueba.appendChild(TaskDiv);
}

const ReadAllTasks = () => {
  Old_TaskData.forEach((Task) => {
    const TaskDiv = document.createElement("div");
    TaskDiv.setAttribute("id", "id_" + Task.id);
    TaskDiv.classList.add('TaskDiv')
    TaskDiv.classList.add('fadeIn')
 
    const h1Title = document.createElement("h2");
    h1Title.textContent = Task.title;

    const pDescrip = document.createElement("p");
    pDescrip.textContent = Task.description;

    const pDate = document.createElement("p");
    pDate.textContent = Task.date;

    const DelTask = document.createElement("button");
    DelTask.textContent = "";
    DelTask.classList.add(Task.id);
   // DelTask.classList.add("DeleteTaskBtn");
    DelTask.classList.add('mdl-button')
    DelTask.classList.add('mdl-js-button')
    DelTask.classList.add('mdl-button--fab')
    DelTask.classList.add('mdl-button--mini-fab')

    const DelBtnIcon = document.createElement("i")
    DelBtnIcon.classList.add('material-icons')
    DelBtnIcon.classList.add('Trash-icon')
    DelBtnIcon.textContent = "delete"

    DelTask.appendChild(DelBtnIcon)
    TaskDiv.appendChild(h1Title);
    TaskDiv.appendChild(pDescrip);
    TaskDiv.appendChild(pDate);
    TaskDiv.appendChild(DelTask);

    DivPrueba.appendChild(TaskDiv);
  });
};


AddTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let Form_TaskTitle = TaskForm.title.value;
  let Form_TaskDescrip = TaskForm.description.value;

  if (Form_TaskTitle == "" || Form_TaskDescrip == "") {
    let SnackBar = document.getElementById("snackbar");
    SnackBar.className = "show";
    setTimeout(function(){ SnackBar.className = SnackBar.className.replace("show", ""); }, 3000);
  } else {
    const NewTask = {
      id: Math.random(),
      title: Form_TaskTitle,
      description: Form_TaskDescrip,
      date: new Date().toDateString(),
    };

    new_TaskData = NewTask;
    Old_TaskData.push(new_TaskData);

    localStorage.setItem("Tasks", JSON.stringify(Old_TaskData));
    //console.log(Old_TaskData);

    TaskForm.reset();
    AddNewTaskAnimation(new_TaskData.id,new_TaskData.title,new_TaskData.description,new_TaskData.date);
  }
});

//En caso de que se requiera implementar
/*
DeleteAllBtn.addEventListener("click", (e) => {
  localStorage.clear();
  localStorage.setItem("Tasks", "[]");
  TaskForm.reset();
  
  Old_TaskData = [];
  new_TaskData = {};

  ReadTasks();
});
*/


