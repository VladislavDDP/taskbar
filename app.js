function onPageLoaded() {
    // Get text from input
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

    // Load tasks from local storage 
    function loadTodos() {
        const data = localStorage.getItem("todos")
        if (data) {
            ul.innerHTML = data
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash")
        for (const button of deleteButtons) {
            listenDeleteTodo(button)
        }

        // Reset button`s actions and progress
        const progressValue = document.querySelectorAll(".progress-value")
        const lessButtons = document.querySelectorAll(".less")
        for (var i = 0; i < lessButtons.length; i++) {
            reduceProgress(lessButtons[i], progressValue[i])
        }
        const moreButtons = document.querySelectorAll(".more")
        for (var i = 0; i < lessButtons.length; i++) {
            raiseProgress(moreButtons[i], progressValue[i])
        }
    }

    // Genetate content dynamically
    function createTodo() {
        const li = document.createElement("li")
        const textSpan = document.createElement("span")
        textSpan.classList.add("todo-text")
        let toDoText = ''
        if (input.value.length > 20){
            toDoText = input.value.substr(0, 20)
        } else toDoText = input.value
        const newTodo = toDoText
        textSpan.append(newTodo)

        const deleteBtn = document.createElement("span")
        deleteBtn.classList.add("todo-trash")
        const icon = document.createElement("i")
        icon.classList.add("fas", "fa-trash-alt")
        deleteBtn.appendChild(icon)

        // A huge block with progressbar (buttons < > and progress line)
        const progressContainer = document.createElement("div")
        progressContainer.classList.add("progress-container")
        const less_btn = document.createElement("button")
        less_btn.classList.add("less", "btn")

        const textDown = document.createElement("i") 
        textDown.classList.add("fas", "fa-chevron-left")
        less_btn.appendChild(textDown)

        const progress = document.createElement("div")
        progress.classList.add("progress")

        const progressValue = document.createElement("div")
        progressValue.classList.add("progress-value")

        progress.appendChild(progressValue)

        const more_btn = document.createElement("button")
        more_btn.classList.add("more", "btn")

        const textUp = document.createElement("i") 
        textUp.classList.add("fas", "fa-chevron-right")
        more_btn.appendChild(textUp)

        progressContainer.appendChild(less_btn)
        progressContainer.appendChild(progress)
        progressContainer.appendChild(more_btn)

        ul.appendChild(li).append(textSpan, progressContainer, deleteBtn)
        input.value = ""

        // Add events on buttons (delete task, update progress line) 
        listenDeleteTodo(deleteBtn)
        reduceProgress(less_btn, progressValue)
        raiseProgress(more_btn, progressValue)
    }

    function onClickTodo(event) {
        if (event.target.tagName === "SPAN") {
            event.target.innerHTML = prompt('Change text:')
        }
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove()
            event.stopPropagation()
        })
    }

    function getToDoTextComponent(event) {
        var textComponent = event.target.parentElement.parentElement
        if (textComponent.tagName === 'DIV') textComponent = textComponent.parentElement
        textComponent = textComponent.querySelector('.todo-text')
        return textComponent
    }

    function reduceProgress(btn, element) {
        btn.addEventListener("click", (event) => {
            let temp = parseInt(element.style.width)     
            temp? temp : temp = 0
            const counter = temp - 20 
            element.style.width = counter < 0? 0 : counter + '%' 

            var textComponent = getToDoTextComponent(event)

            if (counter < 90){
                element.style.background = 'rgb(245, 129, 51)'
                textComponent.classList.remove('checked')
            }
        })
    }

    function raiseProgress(btn, element) {
        btn.addEventListener("click", (event) => {    
            let temp = parseInt(element.style.width)     
            temp? temp : temp = 0
            const counter = temp + 20 
            element.style.width = counter > 100? 100 : counter + '%' 

            var textComponent = getToDoTextComponent(event)

            if (counter > 90){
                if (!textComponent.className.includes("checked"))
                    textComponent.classList.toggle("checked")
                element.style.background = 'green'
            }
        })
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo()
        }
    })

    ul.addEventListener("dblclick", onClickTodo)
    
    // get tasks from local storage
    loadTodos()
}

document.addEventListener("DOMContentLoaded", onPageLoaded)
