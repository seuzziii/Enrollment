const form = document.getElementById("enrollmentForm");
const course = document.getElementById("course");
const majorFieldset = document.getElementById("majorFieldset");
const message = document.getElementById("message");
const tableBody = document.getElementById("studentTableBody");

// Show BSIT Major Options
course.addEventListener("change", () => {

    if(course.value === "BSIT"){
        majorFieldset.classList.remove("hidden");
    }else{
        majorFieldset.classList.add("hidden");
    }

});

// Clear messages when user types
document.querySelectorAll("input, select").forEach(field => {

    field.addEventListener("input", () => {
        message.textContent = "";
        message.className = "";
    });

});

// Form Submit
form.addEventListener("submit", function(event){

    event.preventDefault();

    message.textContent = "";
    message.className = "";

    const studentId = document.getElementById("studentId").value.trim();
    const prefix = document.getElementById("prefix").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const suffix = document.getElementById("suffix").value.trim();
    const email = document.getElementById("email").value.trim();
    const major = document.getElementById("major").value;
    const yearLevel = document.getElementById("yearLevel").value;

    if(studentId.length < 5){
        showError("Student ID must be at least 5 characters.");
        return;
    }

    if(prefix && prefix.length < 2){
        showError("Prefix must be at least 2 characters.");
        return;
    }

    if(firstName.length < 3){
        showError("First Name must be at least 3 characters.");
        return;
    }

    if(middleName && middleName.length < 2){
        showError("Middle Name must be at least 2 characters.");
        return;
    }

    if(lastName.length < 2){
        showError("Last Name must be at least 2 characters.");
        return;
    }

    if(suffix && suffix.length < 2){
        showError("Suffix must be at least 2 characters.");
        return;
    }

    if(!email){
        showError("Email is required.");
        return;
    }

    if(!course.value){
        showError("Please select a course.");
        return;
    }

    if(course.value === "BSIT" && !major){
        showError("Please select a BSIT major.");
        return;
    }

    if(!yearLevel){
        showError("Please select a year level.");
        return;
    }

    const fullname =
        `${prefix} ${firstName} ${middleName} ${lastName} ${suffix}`
        .replace(/\s+/g, " ")
        .trim();

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${studentId}</td>
        <td>${fullname}</td>
        <td>${email}</td>
        <td>${course.value}</td>
        <td>${course.value === "BSIT" ? major : "-"}</td>
        <td>${yearLevel}</td>
    `;

    tableBody.appendChild(newRow);

    message.textContent = "Student enrolled successfully!";
    message.classList.add("success");

    form.reset();
    majorFieldset.classList.add("hidden");

});

function showError(errorMessage){

    message.textContent = errorMessage;
    message.classList.add("error");

}