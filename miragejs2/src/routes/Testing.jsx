import {useEffect, useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTodos } from '../lib/todos'

export async function loader() {
  const todos = await getTodos()
  return {todos}
}

const Testing = () => {
  //const [todos, setTodos] = useState([])
  const {todos} = useLoaderData()
  /*
  useEffect(() => {
  fetch("api/todos")
    .then((response) => response.json())
    .then((json) => setTodos(json)) 
  }, [])
  */
  return (
    <>
      Todos:
      <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))
      }
      </ul>
    </>
  )
}

export default Testing