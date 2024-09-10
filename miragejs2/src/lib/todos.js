export async function getTodos() {
    let todos = await fetch("api/todos")
        .then((response) => {
            response.json()
        })
        .then((json) => {
            console.log(json)
            todos = json
        })
    return todos
}