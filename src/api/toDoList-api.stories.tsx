import {useEffect, useRef, useState} from "react";
import {
    CreateResponseTaskType,
    CreateResponseToDoListType, DeleteResponseTaskType,
    DeleteResponseToDoListType, GetResponseTaskType,
    ToDoListType,
    toDoListsAPI, UpdateResponseTaskType,
    UpdateResponseToDoListType
} from "./toDoLists-api";
import {v1} from "uuid";

export default {
    title: 'API'
}


export const GetToDoLists = () => {
    const [state, setState] = useState<Array<ToDoListType>>();

    const getToDoLists = () => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={getToDoLists}>get ToDoLists</button>
    </div>
}

export const CreateToDoList = () => {
    const [state, setState] = useState<CreateResponseToDoListType>();
    const [title, setTitle] = useState("")

    const createToDoLists = () => {
        toDoListsAPI.createToDoLists(title)
            .then((res) => {
                setState(res.data)
            })
        setTitle("");
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={createToDoLists}>create ToDoLists</button>
    </div>
}

export const DeleteToDoList = () => {
    const [state, setState] = useState<DeleteResponseToDoListType>();
    const [id, setId] = useState("")
    const [selectData, setSelectData] = useState<Array<ToDoListType>>([])

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectData(res.data)
                if (res.data.length > 0) setId(res.data[0].id)
            })
    }, [state])

    const deleteToDoLists = () => {
        toDoListsAPI.deleteToDoLists(id)
            .then((res) => {
                setState(res.data)
            })
            .catch(() => {
                if (!id) console.log('no ToDoLists')
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select value={id}
                onChange={(e) => {
                    setId(e.currentTarget.value)
                }}>
            {selectData.map((item, ) => {
                return <option
                    key={v1()}
                    value={item.id}
                >
                    {item.title}
                </option>
            })}
        </select>
        <button onClick={deleteToDoLists}>delete ToDoLists</button>
    </div>
}

export const UpdateToDoList = () => {
    const [state, setState] = useState<UpdateResponseToDoListType>();
    const [id, setId] = useState("")
    const [selectData, setSelectData] = useState<Array<ToDoListType>>([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectData(res.data)
                if (res.data.length > 0) setId(res.data[0].id)
            })
    }, [state])

    const updateToDoLists = () => {
        toDoListsAPI.updateToDoLists(id, title)
            .then((res) => {
                setState(res.data)
                setTitle("")
            })
            .catch(() => {
                if (!id) console.log('no ToDoLists')
            })

    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select value={id}
                onChange={(e) => {
                    setId(e.currentTarget.value)
                }}>
            {selectData.map((item, ) => {
                return <option
                    key={v1()}
                    value={item.id}
                >
                    {item.title}
                </option>
            })}
        </select>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateToDoLists}>update ToDoLists</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>();
    const [idToDoList, setIdToDoList] = useState<string>("")
    const [selectDataToDoList, setSelectDataToDoList] = useState<Array<ToDoListType>>([])

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectDataToDoList(res.data)
                if (res.data.length > 0) setIdToDoList(res.data[0].id)
            })
    }, [state])

    const getTasks = () => {
        if (idToDoList) {
            toDoListsAPI.getTasks(idToDoList)
                .then((res) => {
                    setState(res.data)
                })
        }
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select title={"ToDoList"} value={idToDoList} onChange={(e) => {
            setIdToDoList(e.currentTarget.value)
        }}>
            {selectDataToDoList.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>ToDoList</span>
        <button
            style={{display: 'block'}}
            onClick={getTasks}
        > get Tasks
        </button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<CreateResponseTaskType>();
    const [idToDoList, setIdToDoList] = useState<string>("")
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListType>>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectDataToDoLists(res.data)
                if (res.data.length > 0) setIdToDoList(res.data[0].id)
            })
        setTitle("");

    }, [])


    const createTasks = () => {
        if (idToDoList) {
            toDoListsAPI.createTasks(idToDoList, title)
                .then((res) => {
                    setState(res.data)
                })
            setTitle("");
        }
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select title={"ToDoList"} value={idToDoList} onChange={(e) => {
            setIdToDoList(e.currentTarget.value)
        }}>
            {selectDataToDoLists.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>ToDoList</span>
        <input style={{display: 'block'}} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button
            style={{display: 'block'}}
            onClick={createTasks}
        > create Tasks
        </button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<DeleteResponseTaskType>();
    const [idToDoList, setIdToDoList] = useState<string>("")
    const [idTask, setIdTask] = useState<string>("")
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListType>>([])
    const [selectDataTasks, setSelectDataTasks] = useState<GetResponseTaskType>()
    const [active, setActive]=useState(false)



    const temp=(id:string)=>{
        toDoListsAPI.getTasks(id)
            .then((res) => {
                setSelectDataTasks(res.data)
                if (res.data.items.length > 0) setIdTask(res.data.items[0].id)
            })
    }

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectDataToDoLists(res.data)
                if (res.data.length > 0) {
                    setIdToDoList(res.data[0].id);
                    temp(res.data[0].id);
                }
            })

    }, [])

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false; // Прошло наше время начального рендера!
        } else {
            temp(idToDoList)
        }
    }, [idToDoList, state]);


    const deleteTasks = () => {
        if (idToDoList && idTask) {
            setActive(true)
            toDoListsAPI.deleteTasks(idToDoList, idTask)
                .then((res) => {
                    setState(res.data)
                    setActive(false)
                    setIdTask('')
                })
        }
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select title={"ToDoList"} value={idToDoList} onChange={(e) => {
            setIdToDoList(e.currentTarget.value)
        }}>
            {selectDataToDoLists.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>ToDoList</span>

        <select title={"Task"} value={idTask} onChange={(e) => {
            setIdTask(e.currentTarget.value)
        }}>
            {selectDataTasks?.items.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>Task</span>

        <button
            disabled={active}
            style={{display: 'block'}}
            onClick={deleteTasks}
        > delete Tasks
        </button>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<UpdateResponseTaskType>();
    const [idToDoList, setIdToDoList] = useState<string>("")
    const [idTask, setIdTask] = useState<string>("")
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListType>>([])
    const [selectDataTasks, setSelectDataTasks] = useState<GetResponseTaskType>()
    const [active, setActive]=useState(false)
    const [title, setTitle]=useState('')



    const temp=(id:string)=>{
        toDoListsAPI.getTasks(id)
            .then((res) => {
                setSelectDataTasks(res.data)
                if (res.data.items.length > 0) setIdTask(res.data.items[0].id)
            })
    }

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectDataToDoLists(res.data)
                if (res.data.length > 0) {
                    setIdToDoList(res.data[0].id);
                    temp(res.data[0].id);
                }
            })

    }, [])

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false; // Прошло наше время начального рендера!
        } else {
            temp(idToDoList)
        }
    }, [idToDoList, state]);


    const updateTasks = () => {
        if (idToDoList && idTask) {
            setActive(true)
            toDoListsAPI.updateTasks(idToDoList, idTask, title)
                .then((res) => {
                    setState(res.data)
                    setActive(false)
                    setIdTask('')
                })
            setTitle("");
        }
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <select title={"ToDoList"} value={idToDoList} onChange={(e) => {
            setIdToDoList(e.currentTarget.value)
        }}>
            {selectDataToDoLists.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>ToDoList</span>

        <select title={"Task"} value={idTask} onChange={(e) => {
            setIdTask(e.currentTarget.value)
        }}>
            {selectDataTasks?.items.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {index}
                </option>
            })}

        </select> <span>Task</span>
        <input style={{display: "block"} } value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>

        <button
            disabled={active}
            style={{display: 'block'}}
            onClick={updateTasks}
        > update Tasks
        </button>
    </div>
}