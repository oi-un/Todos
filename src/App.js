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
  let [remove, setRemove] = useState(false);
  let [modi, setModi] = useState([false, 0]);

  return (
    <div className="wrap">

      { modal == true? <Modal modal={modal} setModal={setModal} todos={todos} setTodos={setTodos} /> : null }

      { modi[0] == true? <Modify modi={modi} setModi={setModi} todos={todos} setTodos={setTodos} /> : null }

      { remove[0] == true? <Delete remove={remove} setRemove={setRemove} todos={todos} setTodos={setTodos} /> : null }

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
      {todos.length == 0 ? 
        <tbody>
          <tr>
            <td colSpan={5}>입력된 일정이 없습니다.</td>
          </tr>
        </tbody> : 
      
        <tbody>
          {todos.map((item, i)=>{
            return(
              <tr key={item.id} className={
                item.done == true? 'todo-done' : ''
              }>
                <td>{i+1}</td>
                <td><div className='todo'>
                  {item.todo}
                  </div></td>
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
                  <button onClick={()=>{setRemove([true, item])}}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      }
      </table>
      
    </div>
  );
}

function Modal({todos, setTodos, modal, setModal}){
  
  let [date, setDate] = useState('');
  let [todo, setTodo] = useState('');
  let addTodo = ()=>{
    let copy = [...todos];
    let newTodo = {id: copy.length, todo: todo, date: date, done: false};
    copy.unshift(newTodo);
    setTodos(copy);
  }

  let [blankDate, setBlankDate] = useState(false);
  let [blankTodo, setBlankTodo] = useState(false);
  function submit(){
    if(date == ''){
      setBlankDate(true);
    } else if(todo == ''){
      setBlankDate(false);
      setBlankTodo(true);
    } else{
      setBlankDate(false);
      setBlankTodo(false);
      addTodo();
      setModal(!modal);
    }
  }

  return(
    <div className='modal-bg'>
      <div className='modal-container'>
        <h5 className='title'>ADD TODO</h5>
        <ul className='add-form'>
          <li>
            {blankDate ? <span className='alert'>Insert Date.</span> : null}
            <span className='add-title'>DATE</span>
            <input type='date' className='add-input' id='addInput' value={date}
            onChange={(e)=>{setDate(e.target.value); console.log(date)}}/>
          </li>
          <li>
            {blankTodo ? <span className='alert'>Insert Todo.</span> : null}
            <span className='add-title'>TODO CONTENT</span>
            <input className='add-input' placeholder='추가할 TODO의 내용을 입력해 주세요.'
            onChange={(e)=>{setTodo(e.target.value)}}/>
          </li>
        </ul>
        <p className='modal-btn'>
          <button onClick={()=>{submit()}}>Submit</button>
          <button onClick={()=>{setModal(!modal)}}>Close</button>
          </p>
      </div>
    </div>
  )
}

function Modify({modi, setModi, todos, setTodos}){
  let index = todos.findIndex((item)=>{return item.id === modi[1].id});

  let [date, setDate] = useState(todos[index].date);
  let [todo, setTodo] = useState(todos[index].todo);

  let modifyTodo = ()=>{
    let copy = [...todos];
    copy[index].todo = todo;
    copy[index].date = date;
    setTodos(copy);
    setModi(!modi);
  }
  return(
    <div className='modal-bg'>
      <div className='modal-container'>
        <h5 className='title'>MODIFY TODO</h5>
        <ul className='add-form'>
          <li>
            <span className='add-title'>DATE</span>
            <input type='date' className='add-input' value={date}
            onChange={(e)=>{setDate(e.target.value)}}/>
          </li>
          <li>
            <span className='add-title'>TODO CONTENT</span>
            <input className='add-input' value={todo} placeholder='수정할 TODO의 내용을 입력해 주세요.'
            onChange={(e)=>{setTodo(e.target.value)}}/>
          </li>
        </ul>
        <p className='modal-btn'>
          <button onClick={()=>{modifyTodo()}}>Submit</button>
          <button onClick={()=>{setModi([false])}}>Close</button>
          </p>
      </div>
    </div>
  )
}

function Delete({remove, setRemove, todos, setTodos}){
  let removeTodo = ()=>{
    let index = todos.findIndex((item)=>{return item.id === remove[1].id});
    let copy = [...todos];
    copy.splice(index, 1);
    setTodos(copy);
    setRemove(false);
  }
  return(
    <div className='modal-bg'>
    <div className='modal-container'>
      <h5 className='title remove-title'>삭제하시겠습니까?</h5>
      
      <p className='modal-btn'>
        <button onClick={()=>{removeTodo()}}>Yes</button>
        <button onClick={()=>{setRemove(false)}}>No</button>
        </p>
    </div>
  </div>
  )
}

export default App;
