let employees = JSON.parse(localStorage.getItem("employees")) || [];

const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const addBtn = document.getElementById("btn");
const employeeList = document.getElementById("employee-list");
const errorMsg = document.getElementById("error");
const successMsg = document.getElementById("success");

function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees() {
  employeeList.innerHTML = "";
  if (employees.length === 0) {
    employeeList.innerHTML = "<p>Data not found.</p>";
    return;
  }
  employees.forEach((emp) => {
    const div = document.createElement("div");
    div.classList.add("list");
    const ul = document.createElement("ul");
    ul.classList.add("list-item");
    ul.innerHTML = `
      <li>${emp.name}</li>
      <li>${emp.profession}</li>
      <li>${emp.age}</li>
    `;
    const delBtn = document.createElement("button");
    delBtn.id = "btn-delete";
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => {
      employees = employees.filter((e) => e.id !== emp.id);
      saveEmployees();
      renderEmployees();
    });
    div.appendChild(ul);
    div.appendChild(delBtn);
    employeeList.appendChild(div);
  });
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();
  if (!name || !profession || !age) {
    errorMsg.classList.remove("hide");
    successMsg.classList.add("hide");
    return;
  }
  const newEmployee = {
    id: Date.now(),
    name,
    profession,
    age: Number(age),
  };
  employees.push(newEmployee);
  saveEmployees();
  renderEmployees();
  successMsg.classList.remove("hide");
  errorMsg.classList.add("hide");
  nameInput.value = "";
  professionInput.value = "";
  ageInput.value = "";
});

renderEmployees();
