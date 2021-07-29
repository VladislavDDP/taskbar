function onPageLoaded() {
    const input = document.querySelector("input[type='text']")
    const ul = document.querySelector("ul.todos")

    const saveButton = document.querySelector("button.save")
    const clearButton = document.querySelector("button.clear")

    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML)
    })
    clearButton.addEventListener("click", () => {
        ul.innerHTML = ""
        localStorage.removeItem('todos', ul.innerHTML)
    })

    function loadTodos() {
        const data = localStorage.getItem("todos")
        if (data) {
            ul.innerHTML = data
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash")
        for (const button of deleteButtons) {
            listenDeleteTodo(button)
        }
    }

    function createTodo() {
        const li = document.createElement("li")
        const textSpan = document.createElement("span")
        textSpan.classList.add("todo-text")
        const newTodo = input.value
        textSpan.append(newTodo)

        const deleteBtn = document.createElement("span")
        deleteBtn.classList.add("todo-trash")
        const icon = document.createElement("i")
        icon.classList.add("fas", "fa-trash-alt")
        deleteBtn.appendChild(icon)

        const progressContainer = document.createElement("div")
        progressContainer.classList.add("progress-container")
        const less_btn = document.createElement("button")
        less_btn.classList.add("less")
        less_btn.classList.add("btn")
        less_btn.textContent = '-'

        const progress = document.createElement("div")
        progress.classList.add("progress")

        const progressValue = document.createElement("div")
        progressValue.classList.add("progress-value")

        progress.appendChild(progressValue)

        const more_btn = document.createElement("button")
        more_btn.classList.add("more")
        more_btn.classList.add("btn")
        more_btn.textContent = '+';

        progressContainer.appendChild(less_btn)
        progressContainer.appendChild(progress)
        progressContainer.appendChild(more_btn)

        const testBox = document.querySelector('.test')
        testBox.append(progressContainer)

        ul.appendChild(li).append(textSpan, deleteBtn)
        input.value = ""
        listenDeleteTodo(deleteBtn)
        reduceProgress(less_btn, progressValue)
        raiseProgress(more_btn, progressValue)
    }

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked")
        }
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove()
            event.stopPropagation()
        })
    }

    function reduceProgress(btn, element) {
        btn.addEventListener("click", (event) => {
            let temp = parseInt(element.style.width)     
            temp? temp : temp = 0
            const counter = temp - 20 
            element.style.width = counter < 0? 0 : counter + '%' 
        })
    }

    function raiseProgress(btn, element) {
        btn.addEventListener("click", (event) => {    
            let temp = parseInt(element.style.width)     
            temp? temp : temp = 0
            const counter = temp + 20 
            element.style.width = counter > 100? 100 : counter + '%' 
        })
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo()
        }
    })

    ul.addEventListener("click", onClickTodo)

    loadTodos()
}

document.addEventListener("DOMContentLoaded", onPageLoaded)
