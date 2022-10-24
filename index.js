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
    ReadTasks();
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
  document.getElementById(`${DivID}`).remove();

  //console.log("Elemento Borrado");
  //console.log(Old_TaskData)
});

const ReadTasks = () => {

  Old_TaskData.forEach((Task) => {
    const TaskDiv = document.createElement("div");
    TaskDiv.setAttribute("id", "id_" + Task.id);

    const h1Title = document.createElement("h2");
    h1Title.textContent = Task.title;

    const pDescrip = document.createElement("p");
    pDescrip.textContent = Task.description;

    const pDate = document.createElement("p");
    pDate.textContent = Task.date;

    const DelTask = document.createElement("button");
    DelTask.textContent = "";
    DelTask.classList.add(Task.id);
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
  });
};


AddTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let Form_TaskTitle = TaskForm.title.value;
  let Form_TaskDescrip = TaskForm.description.value;

  if (Form_TaskTitle == "" || Form_TaskDescrip == "") {
    //alert("Llenar los campos, por favor.");
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

    DivPrueba.innerHTML = ``;

    ReadTasks();
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


