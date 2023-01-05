import styles from './Body.module.css'
import clipboardLogo from '../assets/Clipboard.svg'
import { PlusCircle, Trash } from 'phosphor-react'
import Divider from '@mui/material/Divider';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface BodyProps {
    id: string | number
    content: string
    isChecked: boolean 
}

export function Body({id, content, isChecked}: BodyProps){
    const [taskList, setTaskList]: any = useState([]);
    const [taskBarContent, setTaskBarContent] = useState('');
    const [taskCheckboxChange, setTaskCheckboxChange]: any = useState([]);
   
   useEffect(() => { 
    
        const completedTasks = taskList.filter((object: any) => { 
            if(object.isChecked === true){
            return object
            }
        })

        setTaskCheckboxChange(completedTasks)
    }, [taskList])

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('');
        setTaskBarContent(event.target.value);
    }
    
    function handleCreateNewTask() {
        event?.preventDefault()
       
        setTaskList([...taskList,  {id: uuidv4()  , content: taskBarContent, isChecked: false}]);
        setTaskBarContent('');

    }

    function handleDeleteTask(id: string | number) { 
        const tasksWithoutDeletedOne = taskList.filter((object: any) => {
            return object.id !== id;
        })

        setTaskList(tasksWithoutDeletedOne);  
    }

    function handleCheckTask(id: string | number) {
        const newTaskStatus = taskList.map((object: any) => {
            if(object.id === id) {
                return {
                    ...object, 
                    isChecked: !object.isChecked
                };
            }
            return object;            
        })

        setTaskList(newTaskStatus)
    }

    return(
        <div>
            <div className={styles.addTaskBarPlusButtonPosition}>
                    
                <input 
                    type="text" 
                    key={taskList}
                    name='taskInputText' 
                    value={taskBarContent} 
                    className={styles.addTaskBarAttributes} 
                    onChange={handleNewTaskChange} 
                    placeholder="Adicione uma nova tarefa"
                   
                    />
                <button 
                    className={styles.addTaskButton} 
                    onClick={handleCreateNewTask}
                    disabled={taskBarContent === ''}
                    >
                        Criar <PlusCircle 
                    /> 
                </button>
            
            </div>      
            <div className={styles.tasksBody}>
                <div className={styles.taskStatus}>
                    <span className={styles.tasksStatusHeader}>
                       <div className={styles.boxStatusTasks}>
                            <p className={styles.createdTasks}>
                                Tarefas Criadas
                            </p>
                            <span className={styles.createdTaskNumber}>
                                    {taskList.length}
                            </span>
                        </div>

                       <div className={styles.boxStatusTasks}>
                            <p className={styles.finishedTasks}>
                                Concluídas
                            </p> 
                            <span className={styles.createdTaskNumber}>
                                {taskCheckboxChange.length}
                            </span>
                            <p className={styles.finishedTasks}>
                                 de 
                            </p> 
                            <span className={styles.createdTaskNumber}>
                                {taskList.length}
                            </span>
                       </div>
                        
                    </span>                   
                   
                    {(taskList.length === 0) ? 
                            <>
                                <Divider sx={{background: 'var(--gray-400)', height: '1px', marginTop: '1.5rem' }} variant='fullWidth'  />
                                <div className={styles.tasksHistory}>
                                    <img className={styles.clipboardLogo}src={clipboardLogo} alt='Desenho de uma prancheta' />
                                    <div className={styles.noTasksMessages}>
                                    <p className={styles.boldAlert}>Você ainda não tem tarefas cadastradas</p>
                                    <p className={styles.alert}>Crie tarefas e organize seus itens a fazer</p>
                                    </div>

                                </div> 
                            </>
                    : 
                        <div>
                            {taskList.map((task: object | any) => {

                                
                                return (
                                    
                                        <div className={styles.taskItem} key={task.id}>
                                            <div className={styles.taskRadio}>
                                                <Checkbox 
                                                    name='Checkbox'
                                                    onChange={() => handleCheckTask(task.id)}
                                                    icon={<RadioButtonUncheckedIcon />} 
                                                    checkedIcon={<CheckCircleIcon />} 
                                                    sx={{
                                                        color: 'var(--blue)',
                                                        padding: 0,
                                                        border: 0,
                                                        '&.Mui-checked': {
                                                        color: 'var(--purple-dark)',
                                                        background: 'var(--gray-100)',
                                                        padding: 0,
                                                        }
                                                    }} 
                                                />
                                            </div>
                                            <div className={styles.taskText}>
                                                <p>{task.content}</p>
                                            </div>
                                            <div 
                                                className={styles.trashIcon} 
                                                onClick={() => handleDeleteTask(task.id)} 
                                                >
                                                    <Trash size={24} />
                                            </div>
                                        </div> 
                                     )
                            })}
                        </div> 
                    }    
                </div>
            </div>
        </div>
    )
}