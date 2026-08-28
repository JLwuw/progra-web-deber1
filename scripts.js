let habits_list = [
    {id: 0, name: "Tender la cama", complete: true},
    {id: 1, name: "Ir al gimnasio", complete: false},
    {id: 2, name: "Pasear al perro", complete: false},
    {id: 3, name: "Tomar medicina", complete: false},
]

const habits_ul = document.getElementById("habits-list")
const new_habit_form = document.querySelector("form")
const new_habit_name = document.getElementById("habit-name")

const createHabit = (id, name, complete) => {
    return {
        id: id, 
        name: name, 
        complete: complete
    }
}

function addHabit(name, complete) {
    if (habits_list.length === 0) {
        next_id = 0
    } else {
        next_id = habits_list[habits_list.length - 1].id + 1
    }

    const new_habit = createHabit(next_id, name, complete)
    habits_list.push(new_habit)
}

new_habit_form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = new_habit_name.value.trim()

    if (name === "") {
        return
    }

    addHabit(name, false)
    new_habit_name.value = ""
    renderHabits()
})

habits_ul.addEventListener("click", (event) => {
    console.log("Target clicked: ", event.target)

    const button = event.target.closest("button")

    if (button === null) {
        return
    }

    const index = button.dataset.index
    const action = button.dataset.action
    const habit = habits_list[index]

    if (habit === undefined) {
        return
    }

    if (action === "complete") {
        habit.complete = !habit.complete
    }
    else if (action === "delete") {
        habits_list = habits_list.filter((h) => h != habit)
    }

    renderHabits()
})

function renderHabits() {
    habits_ul.innerHTML = ""

    habits_list.forEach((habit, index) =>  {
        const li = document.createElement("li")
        li.classList.add("row", "gap-2")

        if (habit.complete) {
            li.classList.add("habits-list-item-completed")
        }
        else {
            li.classList.add("habits-list-item")
        }

        const name = document.createElement("p")
        name.classList.add("col-7")
        name.textContent = habit.name

        const complete_button = document.createElement("button")
        complete_button.type = "button"
        complete_button.classList.add("col-2", "btn", "btn-primary")
        complete_button.dataset.action = "complete"
        complete_button.dataset.index = index
        complete_button.textContent = "Completar"

        const delete_button = document.createElement("button")
        delete_button.type = "button"
        delete_button.classList.add("col-2", "btn", "btn-danger")
        delete_button.dataset.action = "delete"
        delete_button.dataset.index = index
        delete_button.textContent = "Borrar"

        li.append(name, complete_button, delete_button)
        habits_ul.appendChild(li)
    })
}

renderHabits()