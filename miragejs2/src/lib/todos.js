export async function getTodos() {
    /*
    let placeholderTodos = [
        {id: "1", text: "Buy groceries", isDone: false},
        {id: "2", text: "Walk Dog", isDone: false},
        {id: "3", text: "learn Mirage", isDone: false},
    ]
    return placeholderTodos
    */
   let todos = []
   await fetch("api/todos")
   .then(response => response.json())
   .then(data => {
        return data
    }) 
   .catch(err => console.log(err))

    

}
