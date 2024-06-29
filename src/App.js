import logo from './logo.svg';
import './App.css';
import Addtodo from './components/Addtodo';
import Listtodo from './components/Listtodo';
import { useState } from 'react';

function App() {
  const [uploadTodoStatus, setUploadTodoStatus]= useState({})
  return (
    <div className='d-grid justify-content-center align-items-center'>
      <Addtodo setUploadTodoStatus={setUploadTodoStatus}/>
      <Listtodo uploadTodoStatus={uploadTodoStatus}/>
    </div>
  );
}

export default App;
