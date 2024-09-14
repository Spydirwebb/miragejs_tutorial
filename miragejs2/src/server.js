import { createServer, Model, Response } from 'miragejs'


let todos = [
    {text: "Buy groceries", isDone: false},
    {text: "Walk Dog", isDone: false},
    {text: "learn Mirage", isDone: false},
]
let users = [
    {username: "Harry", password: "Password", loginAttempts: 0, locked: false, studies: [1,2]},
    {username: "Hermione", password: "Password1", loginAttempts: 0, locked: false, studies: [3,4]},

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
            const reqUsername = attrs.username
            const reqPassword = attrs.password
            try{
                // check username exists
                let user = schema.users.findBy({username: reqUsername})
                
                if(user){                                   // user exists
                    if(!user.locked) {                      // user not locked
                        if(reqPassword === user.password){  // password correct 
                            user.update({loginAttempts: 0})
                            //set data
                            let data = {name: user.username, studies: user.studies}
                            //return passing response
                            console.log(data)
                        } else {                            // password incorrect
                            user.update({loginAttempts : user.loginAttempts + 1})
                            if(user.loginAttempts > 3){     // exceeded password attempts
                                user.update({locked : true})
                            }
                            //return invalid response
                            console.log("Incorrect Password. LoginAttempts: "+user.loginAttempts)
                        }
                    } else{                                 // user locked
                        // return forbidden
                        console.log("Account locked")
                    } 
                } else{                                     // user does not exist
                    // return invalid response
                    console.log("User does not exist")
                }
            } catch(err){
                console.log(err)
            }
            /*              
                try{
                    let user = schema.users.find(username)
                    if(user.password === password){
                        loginAttempts = 0
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
                console.log("Exceeded Login Attempts")
                //let headers = {text: "exceeded login attemps"}
                //return new Response(403, headers)
            }
            */
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
            server.db.loadData({
                todos,
                users
            })
            /*
            users.forEach(user => {
                server.create('user', {
                    username: user.username,
                    password: user.password
                })
            })
            */
        },
      
    })
    return server
}
