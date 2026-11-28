let students = JSON.parse(localStorage.getItem("students")) || [];
const content = document.getElementsByClassName("content")[0];

function valid(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function addStudent(e){
    if(e) e.preventDefault();

    const lastname = document.getElementById("lastname");
    const firstname = document.getElementById("firstname");
    const age = document.getElementById("age");
    const clas = document.getElementById("class");
    const email = document.getElementById("email");

    const fname = firstname.value.trim();
    const lname = lastname.value.trim();
    const clasC = clas.value.trim();

    if(fname === "") EmptyError("firstname");
    if(lname === "") EmptyError("lastname");

    if(age.value === "") EmptyError("age");
        else if(age.value < 15 || age.value > 99) InvalidAgeError("age");

    if(clasC === "") EmptyError("class");

    if(email.value === "") EmptyError("email");
        else if(!valid(email.value)) InvalidEmailError("email");

    if(fname !== "" && lname !== "" && 
        age.value !== "" && clasC !== "" && 
        age.value >= 15 && age.value <= 99 &&
        email.value !== "" && valid(email.value)){
        let student = {
            firstname: firstname.value,
            lastname: lastname.value,
            age: age.value,
            class: clas.value,
            email: email.value,
            date: Date.now()
        }
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
        loadOnScreen();

        lastname.value = "";
        firstname.value = "";
        age.value = "";
        email.value = "";
        clas.value = "";

        const offcanvasEl = document.getElementById("offcanvasAddStudent");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) offcanvasInstance.hide();
    }
}

let currentEditId = null;

function openEditModal(student) {
    currentEditId = student.date;

    ["firstnameEdit", "lastnameEdit", "ageEdit", "classEdit", "emailEdit"].forEach(ClearError);

    document.getElementById("firstnameEdit").value = student.firstname;
    document.getElementById("lastnameEdit").value = student.lastname;
    document.getElementById("ageEdit").value = student.age;
    document.getElementById("classEdit").value = student.class;
    document.getElementById("emailEdit").value = student.email;
}

function editStudent(e){
    if(e) e.preventDefault();
    const found = students.find((student) => student.date === currentEditId);

    const lastname = document.getElementById("lastnameEdit");
    const firstname = document.getElementById("firstnameEdit");
    const age = document.getElementById("ageEdit");
    const clas = document.getElementById("classEdit");
    const email = document.getElementById("emailEdit");

    const fname = firstname.value.trim();
    const lname = lastname.value.trim();
    const clasC = clas.value.trim();

    if(fname === "") EmptyError("firstnameEdit");
    if(lname === "") EmptyError("lastnameEdit");

    if(age.value === "") EmptyError("ageEdit");
        else if(age.value < 15 || age.value > 99) InvalidAgeError("ageEdit");

    if(clasC === "") EmptyError("classEdit");

    if(email.value === "") EmptyError("emailEdit");
        else if(!valid(email.value)) InvalidEmailError("emailEdit");

    if(fname !== "" && lname !== "" && 
        age.value !== "" && clasC !== "" && 
        age.value >= 15 && age.value <= 99 &&
        email.value !== "" && valid(email.value)){
        
        found.firstname = firstname.value;
        found.lastname = lastname.value;
        found.age = age.value;
        found.class = clas.value;
        found.email = email.value;

        localStorage.setItem("students", JSON.stringify(students));
        loadOnScreen();

        lastname.value = "";
        firstname.value = "";
        age.value = "";
        email.value = "";
        clas.value = "";

        const offcanvasEl = document.getElementById("offcanvasEditStudent");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) offcanvasInstance.hide();
    }
}

["firstname", "lastname", "age", "class", "email", 
 "firstnameEdit", "lastnameEdit", "ageEdit", "classEdit", "emailEdit"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => ClearError(id));
});

const stdSub = document.getElementById("studentSubmit");
stdSub.addEventListener("click", addStudent);

const stdEdit = document.getElementById("studentEdit");
stdEdit.addEventListener("click", editStudent);

function deleteStudent(e){
    students = students.filter(student => student.date !== e);
    localStorage.setItem("students", JSON.stringify(students));
    loadOnScreen();
}

function addStudentOnPage(e){
    const section = document.createElement("section");
    section.className = "card";
    section.setAttribute("style", "max-width: 320px");

    const div = document.createElement("div");
    div.className = "card-body";

    const p1 = document.createElement("p");
    p1.className = "card-student-name h4 fw-bold"
    p1.innerText = e.lastname + " " + e.firstname;

    const p2 = document.createElement("p");
    p2.className = "card-class"
    p2.innerText = "Grupa: " + e.class;

    const p3 = document.createElement("p");
    p3.className = "card-age fw-light"
    p3.innerText = "Varsta: " + e.age;

    const p4 = document.createElement("p");
    p4.className = "card-email fst-italic fw-light"
    p4.innerText = "Email: " + e.email;

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-secondary col-12 my-1";
    btnEdit.setAttribute("data-bs-toggle", "offcanvas");
    btnEdit.setAttribute("href", "#offcanvasEditStudent");
    btnEdit.setAttribute("role", "button");
    btnEdit.setAttribute("aria-controls", "offcanvasEditStudent");
    btnEdit.addEventListener("click", () => openEditModal(e));
    btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>';

    const btn = document.createElement("button");
    btn.className = "btn btn-danger col-12";
    btn.innerHTML = '<i class="bi bi-x-square"></i>';
    btn.addEventListener("click", () => deleteStudent(e.date));

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(btnEdit);
    div.appendChild(btn);
    section.appendChild(div);
    content.appendChild(section);
}

function loadOnScreen(){
    if(students == [] || students.length <= 0){
        content.innerHTML = "";
        const studentListError = document.createElement("p");
        studentListError.className = "lead fst-italic";
        studentListError.innerText = "Nu există elevi înregistrați";
        content.appendChild(studentListError);
    } else {
        content.innerHTML = "";
        students.forEach(e => {
            addStudentOnPage(e);
        }); 
    }
}

const capitalize = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
}

const formatFieldName = (e) => capitalize(e.replace("Edit", ""));

function ErrorOnPage(e){
    const div = document.getElementById(e + "Div");
    div.classList.add("p-0", "border-start", "border-danger", "border-4", "on");

    const input = div.getElementsByTagName("input")[0];
    input.classList.add("rounded-0");

    const p = div.getElementsByTagName("p")[0];
    p.classList.add("text-sm", "text-danger", "m-0", "p-1", "alert", "alert-danger", "rounded-0");
}

function EmptyError(e){
    ErrorOnPage(e);
    const p = document.getElementById(e + "Div").getElementsByTagName("p")[0];
    p.innerHTML = '<i class="bi bi-exclamation-triangle"></i>  ' + formatFieldName(e) + " field is empty";
}

function InvalidEmailError(e){
    ErrorOnPage(e);
    const p = document.getElementById(e + "Div").getElementsByTagName("p")[0];
    p.innerHTML = '<i class="bi bi-exclamation-triangle"></i>  ' + formatFieldName(e) + " is invalid";
}

function InvalidAgeError(e){
    ErrorOnPage(e);
    const p = document.getElementById(e + "Div").getElementsByTagName("p")[0];
    p.innerHTML = '<i class="bi bi-exclamation-triangle"></i>  ' + formatFieldName(e) + " must be 15 or older";
}

function ClearError(e) {
    const div = document.getElementById(e + "Div");
    div.classList.remove("p-0", "border-start", "border-danger", "border-4", "on");

    const input = div.getElementsByTagName("input")[0];
    input.classList.remove("rounded-0");

    const p = div.getElementsByTagName("p")[0];
    p.classList.remove("text-sm", "text-danger", "m-0", "p-1", "alert", "alert-danger", "rounded-0");
    p.innerHTML = "";
}

loadOnScreen();