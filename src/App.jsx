import { useState} from 'react'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [listTodos, addNewTodoToList] = useState([])

  function persistInfo(infoList){
      const info = JSON.stringify(infoList)
      localStorage.setItem('todo-list', info)
  }
 
  function handleClickAddTodo(e)  {
    e.preventDefault()

    if(newTodo.trim() == '') return

    const initNewTodo = {id:crypto.randomUUID() , text : newTodo, edit : false, completed : false}
    const newListTodos = [initNewTodo, ...listTodos]
    addNewTodoToList(newListTodos)
    setNewTodo('')
    persistInfo(newListTodos)
  }

  function updateValueNewTodo(e)
  {
    setNewTodo(e.target.value)
  }

  
  return (
    <main>
      <label htmlFor="">
        Nueva tarea: 
        <input value={ newTodo } onChange={ (e) => { updateValueNewTodo(e)  } }  className='input-new-todo' />
      </label>

      <button onClick={ handleClickAddTodo } className='btn-action'>&#10010; Agregar</button>

      <TodoList 
        listTodos={listTodos}
        persistInfo={persistInfo}
        addNewTodoToList={addNewTodoToList}
      />
    </main>
  )
}

export default App
