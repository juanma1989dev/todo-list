import { useEffect, useState } from "react"
import Todo from "./Todo"

const TodoList = ({listTodos, persistInfo, addNewTodoToList}) => {

    const [editTodo, setEditTodo] = useState('')
    

    function handleClickEditTodo(todo){
        const {id, edit}  = todo

        if(!edit) {
            showInputForEditTodo(id)
        } else {
            saveEditTodo(id)
        }    
    }

    function handleClickRemoveTodo(e) {
        const {id}  = e.target.dataset

        const newListTodos = listTodos.filter((todo) => {
            if(id != todo.id ) return todo
        })

        addNewTodoToList(newListTodos)
        persistInfo(newListTodos)
    }

    function showInputForEditTodo(id){
        const newListTodos = listTodos.map((todo) => {
          if(id == todo.id ) {
            setEditTodo(todo.text) 
            return {...todo, edit :true}
          }
          else return {...todo, edit :false}
        }) 
    
        addNewTodoToList(newListTodos)
        persistInfo(newListTodos)
      }
    
    function saveEditTodo(id){
        if(editTodo.trim() == '') return

        const newListTodos = listTodos.map((todo) => {
            if(id == todo.id ) {
            setEditTodo(todo.text) 
            return {...todo, edit :false, text : editTodo}
            }
            else return {...todo, edit :false}
        }) 

        addNewTodoToList(newListTodos)
        setEditTodo('')
        persistInfo(newListTodos)
    }
    
    function handleChangeCompleted(e){
        const {id} = e.target.dataset
        const { checked } = e.target 

        const newListTodos = listTodos.map((todo) => {
            if(id == todo.id ) {
            return {...todo, edit :false, completed : checked}
            }
            else return {...todo, edit :false}
        }) 

        addNewTodoToList(newListTodos)
        persistInfo(newListTodos)
    }
    
    function getInfoPersit(){
        const info = localStorage.getItem('todo-list') ?? '[]'
        const infoParse = JSON.parse(info)
        return infoParse
    }    

    useEffect(() => {
        const newTodos = getInfoPersit()
        addNewTodoToList(newTodos)
    }, [])

    return (
        <> 
            { listTodos.length > 0 
                ?  <section className='todo-list'>
                    { listTodos.map((todo, idx) => {
                        return( 
                        <Todo 
                            key={idx} 
                            todo={todo} 
                            handleChangeCompleted={handleChangeCompleted}
                            handleClickEditTodo={handleClickEditTodo}
                            editTodo={editTodo}
                            setEditTodo={setEditTodo}
                            handleClickRemoveTodo={handleClickRemoveTodo}
                        />
                        )
                    }) }
                    </section>
                : <h3>Sin tareas para completar</h3>
            }
        </>
    )
}


export default TodoList