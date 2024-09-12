import { createServer, Model, Response } from 'miragejs'


let todos = [
    {text: "Buy groceries", isDone: false},
    {text: "Walk Dog", isDone: false},
    {text: "learn Mirage", isDone: false},
]
let users = [
    {username: "Harry", password: "Password", loginAttemps: 0, studies: [1,2]},
    {username: "Hermione", password: "Password1", loginAttemps: 0, studies: [3,4]},

]


export function makeServer({environment = 'test'} = {}) {
    let server = createServer({
        models: {
          user: Model,
          todo: Model,
        },
      
        routes() {
          // Auth
          this.namespace = "auth"
          this.post("/login", (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            const username = request.params.username
            const password = request.params.password
            if(loginAttemps<3){
                try{
                    let user = schema.users.find(username)
                    if(user.password === password){
                        loginAttemps = 0
                        let headers = {}
                        let data = {
                            name: user.username,
                            studies: user.studies
                        }
                        return new Response(202, headers, data)
                    }
                } catch{
                    let headers = {text: "username not found"}
                    return new Response(404, headers)
                  
                }
            } else{
                let headers = {text: "exceeded login attemps"}
                return new Response(403, headers)
            }
          })
          
          // API
          this.namespace = "api"
      
          this.get("/todos", (schema, request) => {
            return schema.todos.all()
          })
          //POST Request
          this.post("todos", (schema, request) => {
            const attrs = JSON.parse(request.requestBody)
            todos.push(attrs)
            return schema.todos.create(attrs)
        })
          //DELETE Request
          this.delete("todos/:id", (schema, request) => {
              const id = request.params.id
              return schema.todos.find(id).destroy()
          })
        },
      
        seeds(server) {
            todos.forEach(todo => {
                server.create('todo', {
                    text: todo.text,
                    isDone: todo.isDone
                })
            })
            users.forEach(user => {
                server.create('user', {
                    username: user.username,
                    password: user.password
                })
            })

        },
      
    })
    return server
}
