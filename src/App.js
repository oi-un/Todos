import './reset.css';
import './App.css';
import { useState } from 'react';

function App() {

  let [todos, setTodos] = useState([
    {id: 0, todo: '아침 산책 나가기', date: '2024-04-25', done: false},
    {id: 1, todo: '2시간 공부하기', date: '2024-04-25', done: false},
    {id: 2, todo: '마트로 장보러 가기', date: '2024-04-25', done: false}
  ]);

  let changeDone = (item)=>{
    let index = todos.findIndex((todo)=>{
      return todo.id === item.id;
    })
    let copy = [...todos];
    
    if(copy[index].done == false){
      copy[index].done = true;
    } else{
      copy[index].done = false
    }
    setTodos(copy);
  };

  let [modal, setModal] = useState(false);
  let [newTodoContent, setNewTodoContent] = useState('');
  let [newTodoDate, setNewTodoDate] = useState('');

  let newTodo = ()=>{
    let copy = [...todos];
    let todo = {id: copy.length+1, todo: newTodoContent, date: newTodoDate, done: false};
    copy.unshift(todo);
    setTodos(copy);
  }

  let [modi, setModi] = useState([false, 0]);

  return (
    <div className="wrap">

      { modal == true? <Modal modal={modal} setModal={setModal}
        setNewTodoContent={setNewTodoContent} setNewTodoDate={setNewTodoDate}
        newTodo={newTodo} /> : null }

      { modi[0] == true? <Modify modi={modi} setModi={setModi} todos={todos} setTodos={setTodos} /> : null }

      <h3 className='title'>Todos
        <span className='add-todo'onClick={()=>{setModal(!modal);}}>
          <i className="fa-solid fa-circle-plus"></i>
        </span>
      </h3>

      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>CONTENT</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>MODIFY</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, i)=>{
            return(
              <tr key={item.id} className={
                item.done == true? 'todo-done' : ''
              }>
                <td>{i+1}</td>
                <td>{item.todo}</td>
                <td>{item.date}</td>
                <td onClick={()=>{changeDone(item);}}>
                  {
                    item.done ? 
                    <i className="fa-solid fa-square-check"></i> : 
                    <i className="fa-regular fa-square-check"></i>
                  }
                </td>
                <td>
                  <button onClick={()=>{setModi([true, item])}}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
    </div>
  );
}

function Modal(props){
  return(
    <div className='modal-bg'>
      <div className='modal-container'>
        <h5 className='title'>ADD TODO</h5>
        <ul className='add-form'>
          <li>
            <span className='add-title'>DATE</span>
            <input type='date' className='add-input' placeholder='yyyy-mm-dd 형식으로 입력해 주세요.'
            onChange={(e)=>{props.setNewTodoDate(e.target.value)}}/>
          </li>
          <li>
            <span className='add-title'>TODO CONTENT</span>
            <input className='add-input' placeholder='추가할 TODO의 내용을 입력해 주세요.'
            onChange={(e)=>{props.setNewTodoContent(e.target.value)}}/>
          </li>
        </ul>
        <p className='modal-btn'>
          <button onClick={()=>{props.newTodo()}}>Submit</button>
          <button onClick={()=>{props.setModal(!props.modal)}}>Close</button>
          </p>
      </div>
    </div>
  )
}

function Modify({modi, setModi, todos, setTodos}){
  let [date, setDate] = useState('');
  let [todo, setTodo] = useState('');

  let index = todos.findIndex((item)=>{return item.id === modi[1].id});

  let changeDate = (val)=>{
    setDate(val);

    let copy = [...todos];   
    copy[index].date = date;
  }
  return(
    <div className='modal-bg'>
      <div className='modal-container'>
        <h5 className='title'>MODIFY TODO</h5>
        <ul className='add-form'>
          <li>
            <span className='add-title'>DATE</span>
            <input type='date' className='add-input' value={todos[index].date}
            onChange={(e)=>{setDate(e.target.value); console.log(date)}}/>
          </li>
          <li>
            <span className='add-title'>TODO CONTENT</span>
            <input className='add-input' value={todos[index].todo} placeholder='수정할 TODO의 내용을 입력해 주세요.'
            onChange={(e)=>{setTodo(e.target.value); console.log(todo)}}/>
          </li>
        </ul>
        <p className='modal-btn'>
          <button onClick={()=>{}}>Submit</button>
          <button onClick={()=>{setModi([false])}}>Close</button>
          </p>
      </div>
    </div>
  )
}

export default App;
