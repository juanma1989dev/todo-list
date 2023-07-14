
const Todo = ({todo, handleChangeCompleted, handleClickEditTodo, editTodo, setEditTodo, handleClickRemoveTodo}) => {
    
    return (
        <article  className='todo'>
            <input data-id={ todo?.id } type='checkbox' checked={ todo.completed } onChange={ handleChangeCompleted } />
            
            <button className='btn-action'  data-id={ todo.id } onClick={ () => handleClickEditTodo(todo)} disabled={todo.completed}>
            { todo.edit ? <span>&#10004;</span> : <span>&#9998;</span> } { todo.edit ? 'Guardar' : 'Editar' }
            </button>

            <div className='todo-text'>
            { todo.edit 
                ? <input value={ editTodo }  onChange={ (e) => { setEditTodo(e.target.value) }  } />
                : <span className={ `${todo.completed === true ? 'todo-completed' : ''}`}> {todo.text} </span>
            }
            </div>

            <button  data-id={ todo.id } onClick={handleClickRemoveTodo}>&#10006; Eliminar</button><br></br>
        </article>
    )
}

 
export default Todo