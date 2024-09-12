import {useEffect, useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTodos } from '../lib/todos'

const Testing = () => {
  const [todos, setTodos] = useState([])
  const [name, setName] = useState("")


  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    fetch("api/todos")
    .then(response => response.json())
    .then(data => setTodos(data.todos))
    .catch(err => console.log(err))
  }

  const createTodo = async () => {
    try {
      const response = await fetch("api/todos", {
         method: 'POST', 
         body: JSON.stringify({ 
          text: name,
          isDone: false
        }) 
      })
      .then((res) => {
        console.log(res.json())
        getTodos()
        setName("")
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTodo()
  }

  return (
    <>
      Todos:
      <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.id}: {todo.text}</li>
      ))
      }
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Todo" value={name} onChange={(e)=> setName(e.target.value)} />
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default Testing