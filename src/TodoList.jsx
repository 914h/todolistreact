import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Todo() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedCompletedTasks = localStorage.getItem("completedTasks");
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });

    const [editIndex, setEditIndex] = useState(-1);
    const [editedTaskText, setEditedTaskText] = useState("");
    const inputRef = useRef();
    const editInputRef = useRef();
    const [showCheckButton, setShowCheckButton] = useState(true);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (editIndex !== -1) {
            editInputRef.current.focus();
        }
    }, [editIndex]);

    const addTask = () => {
        const taskItemText = inputRef.current.value;
        if (taskItemText.trim() !== "") {
            setTasks([...tasks, { text: taskItemText, completed: false }]);
            inputRef.current.value = "";
        } else {
            toast.error('Please add some task to do !', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const clearTasks = () => {
        setTasks([]);
    }

    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    const editTask = (index) => {
        setEditIndex(index);
        setEditedTaskText(tasks[index].text);
        editInputRef.current.focus();
    }

    const saveEditedTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = editedTaskText;
        setTasks(updatedTasks);
        setEditIndex(-1);
        setEditedTaskText("");
    }

    const toggleCompleted = (index) => {
        const updatedCompletedTasks = [...completedTasks];
        if (completedTasks.includes(index)) {
            updatedCompletedTasks.splice(updatedCompletedTasks.indexOf(index), 1);
        } else {
            updatedCompletedTasks.push(index);
        }
        setCompletedTasks(updatedCompletedTasks);
    }

    function confirmer(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    function saveConfirmer(event) {
        if (event.key === 'Enter') {
            saveEditedTask();
        }
    }

    useEffect(() => {
        AOS.init({
            // Global settings...
        });
    }, []);

    return (
        <>
            <div className="App" data-aos="fade-up" data-aos-duration="500">
                <div className="container">
                    <div className="todolist">
                        <div className="head">
                            <h1>TODO LIST</h1>
                            <input type="text" placeholder="Add a task !" ref={inputRef} onKeyDown={confirmer} />
                            <button onClick={addTask} id="commands">Add</button>
                            <button onClick={clearTasks} id="commands">Clear</button>
                            <p>Tasks to do <b>{tasks.length}</b></p>
                        </div>
                        <div className="body">
                            <ul>
                                {tasks.map((task, index) => (
                                    <div data-aos="fade-right" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500">

                                        <li key={index} className={completedTasks.includes(index) ? "completed" : ""}>
                                            {showCheckButton && (
                                                <button id="checkButton" onClick={() => toggleCompleted(index)}>
                                                    {completedTasks.includes(index) ? "Uncheck" : "Check"}
                                                </button>
                                            )}
                                            {index === editIndex ? (
                                                <div className="edited">
                                                    <input
                                                        type="text" defaultValue={task.text}
                                                        ref={editInputRef}
                                                        value={editedTaskText}
                                                        onChange={(e) => setEditedTaskText(e.target.value)}
                                                        onKeyDown={saveConfirmer}
                                                    />
                                                    <button id="buttono" onClick={() => { saveEditedTask(); setShowCheckButton(true); }}> SAVE</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>{task.text}</span>
                                                    {!completedTasks.includes(index) &&
                                                        <div className="buttons">
                                                            <button onClick={() => { editTask(index); setShowCheckButton(false); }}>Edit</button>
                                                            <button onClick={() => deleteTask(index)}>Delete</button>
                                                        </div>
                                                    }
                                                    {completedTasks.includes(index) &&
                                                        <div className="buttons">
                                                            <button id="deletebutton" onClick={() => deleteTask(index)}>Delete</button>
                                                        </div>
                                                    }

                                                </>
                                            )}
                                        </li>

                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                transition={Bounce}
                theme="dark"
            />
        </>
    );
}

export default Todo;
