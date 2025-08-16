const todoForm = document.querySelector('#todo-form');
const task = document.querySelector("#task");
const submit = document.querySelector(".submit-btn");
const taskList = document.querySelector("#task-list")
console.log(todoForm, task, submit, taskList);
//mang luu gia tri
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
todoForm.onsubmit = (e) => {
    e.preventDefault();
    const newtask = {
        name: task.value.trim(),
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name === newtask.name) {
            alert(`Công việc ${tasks[i].name} này đã có rồi`);
            return;
        }

    }
    if (newtask.name.trim() === "") {
        alert("Vui lòng nhập công việc");
        return;
    }
    tasks.unshift(newtask);
    //luu lai vao local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //render task ra UI
    renderTasks();
    //clear input
    task.value = "";
}
//ham escapeHTML de tranh bi XSS

function escapeHTML(str) {
    const escape = document.createElement("div");//tạo div ảo không trong DOM
    escape.innerText = str;//chèn nội dung vào div ảo thông qua tham số str
    const result = escape.innerHTML;//biến nhận về kết quả đã escape
    return result;//trả về kết quả cuối cùng
}
//render task ra UI
//nếu tasks rỗng thì hiển thị thông báo
//nếu không thì hiển thị danh sách công việc

// Sửa lại hàm renderTasks để thêm 3 nút vào mỗi li
function renderTasks() {
    if (!tasks.length) {
        taskList.innerHTML = "<li>Danh sách trống</li>";
        return;
    }
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${escapeHTML(task.name)}
            <div class="btn-group">
            <button class="add-btn">EDIT</button>
            <button class="edit-btn">MARK AS DONE</button>
            <button class="delete-btn">DELETE</button>
            </div>
        `;
        taskList.appendChild(item);
    });
}
renderTasks();

