let API = "http://localhost:8000/todo";

let btn = document.querySelector(".btn");
let todoList = document.querySelector(".todo-list");
let send = document.querySelector(".send");
let save = document.querySelector(".save");
let inpName = document.querySelector(".inp-name");
let inpFirst = document.querySelector(".inp-first");
let inpPhone = document.querySelector(".inp-phone");
let weekKpi = document.querySelector(".week-kpi");
let monthKpi = document.querySelector(".month-kpi");
let mainOl = document.querySelector(".main-ol");
let mainScreen = document.querySelector(".main-screen");
let btnX = document.querySelector(".btn-x");
let disabl = document.querySelector(".disabl");
let pagination = document.querySelector(".pagination");
let inpSearch = document.querySelector(".inp-search");
btnX.addEventListener("click", function () {
  todoList.style.display = "none";
  mainScreen.style.display = "block";
});

send.addEventListener("click", async function () {
  let obj = {
    name: inpName.value,
    inpFirst: inpFirst.value,
    inpPhone: inpPhone.value,
    weekKpi: weekKpi.value,
    monthKpi: monthKpi.value,
  };

  if (
    obj.name.trim() === "" ||
    obj.inpFirst.trim() === "" ||
    obj.inpPhone.trim() === "" ||
    obj.weekKpi.trim() === "" ||
    obj.monthKpi.trim() === ""
  ) {
    alert("Заполните поля!");
  }

  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  todoList.style.display = "none";
  mainScreen.style.display = "block";
  inpName.value = "";
  inpFirst.value = "";
  inpPhone.value = "";
  weekKpi.value = "";
  monthKpi.value = "";
  location.reload();
  getTodoList();
});

btn.addEventListener("click", function () {
  todoList.style.display = "flex";
  mainScreen.style.display = "none";
});

// inpSearch.addEventListener("input", function (e) {
//   // console.log("input");
//   getTodoList();
// });

let page = 1;
async function getTodoList() {
  // await fetch(`${API}?q=${inpSearch.value}&_page=${page}&_limit=2`);
  let allTodos = await fetch(API)
    .then(res => res.json())
    .catch(err => console.log(error));
  // console.log(allTodos);
  let lastPage = Math.ceil(allTodos.length / 2);
  allTodos.forEach(element => {
    let div = document.createElement("div");
    div.id = element.id;
    div.style.border = "1px solid black";
    div.style.maxWidth = "300px";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.textTransform = "Uppercase";
    div.innerHTML = `
    <li><strong>Имя:  </strong>   ${element.name}</li>
    <li><strong>Фамилия:  </strong>   ${element.inpFirst}</li>
    <li><strong>Номер телефона:  </strong>   ${element.inpPhone}</li>
    <li><strong>Недельный KPI: </strong> ${element.weekKpi}</li>
    <li><strong>Ежемесячный KPI: </strong> ${element.monthKpi}</li>
    <button style="margin-top: 10px" class="btn-delete">Удалить</button>
    <button class="btn-edit">Изменить</button>
    `;
    mainOl.append(div);
  });
  // pagination.innerHTML = `
  // <button id="btn-prev" ${page === 1 ? "disabled" : ""}>prev</button>
  // <span>${page}</span>
  // <button id="btn-next" ${page === lastPage ? "disabled" : ""}>next</button>
  // `;
}
getTodoList();

save.addEventListener("click", async function () {
  let editedTodo = {
    name: inpName.value,
    inpFirst: inpFirst.value,
    inpPhone: inpPhone.value,
    weekKpi: weekKpi.value,
    monthKpi: monthKpi.value,
  };
  let id = disabl.value;

  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  todoList.style.display = "none";
  mainScreen.style.display = "block";
  // getTodos();
  location.reload();
});

document.addEventListener("click", async function (e) {
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    // getTodoList();
    location.reload();
  }

  if (e.target.className === "btn-edit") {
    console.log(e.target);
    todoList.style.display = "flex";
    mainScreen.style.display = "none";
    send.style.display = "none";
    save.style.display = "block";
    save.style.width = "258px";
    save.style.height = "45px";
    save.style.marginTop = "25px";
    save.style.marginBottom = "25px";
    save.style.borderRadius = "3px";
    send.style.width = "258px";
    send.style.height = "45px";
    send.style.marginTop = "25px";
    send.style.marginBottom = "25px";
    send.style.borderRadius = "3px";
    let id = e.target.parentNode.id;
    console.log(id);

    let response = await fetch(`${API}/${id}`)
      .then(res => res.json())
      .catch(error => console.log(error));
    // console.log(response);
    // if (e.target.id === "btn-next") {
    //   page++;
    //   getTodoList();
    //   location.reload();
    // }
    // if (e.target.id === "btn-prev") {
    //   page--;
    //   getTodoList();
    //   location.reload();
    // }

    inpName.value = response.name;
    inpFirst.value = response.inpFirst;
    inpPhone.value = response.inpPhone;
    weekKpi.value = response.weekKpi;
    monthKpi.value = response.monthKpi;
    disabl.value = response.id;
  }
});
