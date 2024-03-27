
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Todoo() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [editIndex, setEditIndex] = useState(-1);
    const [editedTaskText, setEditedTaskText] = useState("");
    const inputRef = useRef();
    const editInputRef = useRef();

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
            setTasks([...tasks, taskItemText]);
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
        setEditedTaskText(tasks[index]);
        editInputRef.current.focus();
    }

    const saveEditedTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = editedTaskText;
        setTasks(updatedTasks);
        setEditIndex(-1);
        setEditedTaskText("");
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
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
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
                                    <li key={index} 
                                    data-aos="fade-right"data-aos-anchor="#example-anchor" data-aos-offset="500"
data-aos-duration="500"
                                   >
                                        {index === editIndex ? (
                                            <>
                                                <div className="edited">
                                                    <input 
                                                        type="text" defaultValue={task} 
                                                        ref={editInputRef} 
                                                        value={editedTaskText} 
                                                        onChange={(e) => setEditedTaskText(e.target.value)}
                                                        onKeyDown={saveConfirmer} 
                                                    />
                                                    <button id="buttono" onClick={saveEditedTask}>SAVE</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button id="checkButton">Check</button>
                                                <span>{task}</span>
                                                <div className="buttons">
                                                    <button onClick={() => editTask(index)}>Edit</button>
                                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                                </div>
                                            </>
                                        )}
                                    </li>
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

export default Todoo;
