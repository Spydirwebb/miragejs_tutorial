import { createServer } from 'miragejs'


export function makeServer() {
    let server = createServer({
        routes() {
            this.namespace = "api"

            this.get("todos", () => [
            {id: "1", text: "Buy groceries", isDone: false},
            {id: "2", text: "Walk Dog", isDone: false},
            {id: "3", text: "learn Mirage", isDone: false},
            ])
        }
    })
    return server
}