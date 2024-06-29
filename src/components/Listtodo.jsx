import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { deleteTodo, getAllTodos, getTodoDetailsById, updateTodoByID } from '../services/allAPI';
import Modal from 'react-bootstrap/Modal';

function Listtodo({ uploadTodoStatus }) {
    const [eachTaskValue, setEachTaskValue] = useState({
        todoName: "",
        todoDescription: ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [allTodo, setAllTodo] = useState([])
    const getAllTodoItem = async () => {
        const response = await getAllTodos();
        const { data } = response;
        setAllTodo(data)
    }
    useEffect(() => {
        getAllTodoItem()
    }, [uploadTodoStatus])
    const removeTODO = async (id) => {
        const response = await deleteTodo(id);
        alert("successfully deleted the tos item");
        getAllTodoItem();
    }
    const getTodoDetails = async (id) => {
        handleShow();
        const res = await getTodoDetailsById(id)
        const { data } = res;
        setEachTaskValue(data)
    }
    const updateTodo = async()=>{
        handleClose();
        await updateTodoByID(eachTaskValue.id, eachTaskValue)
        alert("Task updated successfully")
        getAllTodoItem();
    }
    return (
        <>
            <div className='mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTodo?.length > 0 ?
                                allTodo.map((item) => (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.todoName}</td>
                                        <td>{item.todoDescription}</td>
                                        <td>
                                            <Button onClick={() => getTodoDetails(item.id)}>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                            <Button className='ms-3' onClick={() => removeTODO(item.id)}>
                                                <i class="fa-solid fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )) :
                                <p>No TO Do Items</p>
                        }

                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mt-3 '>
                        <input type="text"
                        onChange={(e)=>setEachTaskValue({...eachTaskValue,todoName:e.target.value})}
                        className='form-control border-primary' value={eachTaskValue.todoName} />
                    </div>
                    <div className='mt-3'>
                        <textarea 
                        value={eachTaskValue.todoDescription}
                        onChange={(e)=>setEachTaskValue({...eachTaskValue,todoDescription:e.target.value})}
                        id="w3review" name="w3review" rows="3" cols="30" className='form-control border-primary'>
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTodo}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Listtodo