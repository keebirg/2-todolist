import React, {useEffect, useRef, useState} from "react";
import {
    CreateResponseTaskType,
    CreateResponseToDoListType,
    DeleteResponseTaskType,
    DeleteResponseToDoListType,
    GetResponseTaskType,
    ToDoListServerType,
    toDoListsAPI,
    UpdateResponseTaskType,
    UpdateResponseToDoListType,
    DataToUpdateType,
    TaskStatus,
    TaskPriority,
    authAPI,
    GetResponseAuthMeType,
    DeleteResponseLogoutType, PostResponseLoginType
} from "./toDoLists-api";
import {v1} from "uuid";
import {useFormik} from "formik";


export default {
    title: 'API'
}


export const GetToDoLists = () => {
    const [state, setState] = useState<Array<ToDoListServerType>>();

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
        toDoListsAPI.createToDoList(title)
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
    const [selectData, setSelectData] = useState<Array<ToDoListServerType>>([])

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectData(res.data)
                if (res.data.length > 0) setId(res.data[0].id)
            })
    }, [state])

    const deleteToDoLists = () => {
        toDoListsAPI.deleteToDoList(id)
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
            {selectData.map((item,) => {
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
    const [selectData, setSelectData] = useState<Array<ToDoListServerType>>([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        toDoListsAPI.getToDoLists()
            .then((res) => {
                setSelectData(res.data)
                if (res.data.length > 0) setId(res.data[0].id)
            })
    }, [state])

    const updateToDoLists = () => {
        toDoListsAPI.updateToDoList(id, title)
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
            {selectData.map((item,) => {
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
    const [selectDataToDoList, setSelectDataToDoList] = useState<Array<ToDoListServerType>>([])

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
                    {item.title}
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
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListServerType>>([])
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
            toDoListsAPI.createTask(idToDoList, title)
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
                    {item.title}
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
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListServerType>>([])
    const [selectDataTasks, setSelectDataTasks] = useState<GetResponseTaskType>()
    const [active, setActive] = useState(false)


    const temp = (id: string) => {
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
            toDoListsAPI.deleteTask(idToDoList, idTask)
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
                    {item.title}
                </option>
            })}

        </select> <span>ToDoList</span>

        <select title={"Task"} value={idTask} onChange={(e) => {
            setIdTask(e.currentTarget.value)
        }}>
            {selectDataTasks?.items.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {item.title}
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
    const [selectDataToDoLists, setSelectDataToDoLists] = useState<Array<ToDoListServerType>>([])
    const [selectDataTasks, setSelectDataTasks] = useState<GetResponseTaskType>()
    const [active, setActive] = useState(false)
    const [title, setTitle] = useState('')


    const temp = (id: string) => {
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


    const updateTitleTasks = () => {
        if (idToDoList && idTask) {
            setActive(true)

            const task = selectDataTasks?.items.find((task) => task.id === idTask)
            const DataToUpdate: DataToUpdateType = {
                title: title,
                status: task?.status || TaskStatus.New,
                priority: task?.priority || TaskPriority.Low
            }
            toDoListsAPI.updateTask(idToDoList, idTask, DataToUpdate)
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
                    {item.title}
                </option>
            })}

        </select> <span>ToDoList</span>

        <select title={"Task"} value={idTask} onChange={(e) => {
            setIdTask(e.currentTarget.value)
        }}>
            {selectDataTasks?.items.map((item, index) => {
                return <option key={v1()} value={item.id}>
                    {item.title}
                </option>
            })}

        </select> <span>Task</span>
        <input style={{display: "block"}} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>

        <button
            disabled={active}
            style={{display: 'block'}}
            onClick={updateTitleTasks}
        > update Tasks
        </button>
    </div>
}

export const GetAuthMe = () => {
    const [state, setState] = useState<GetResponseAuthMeType>();

    const getAuthMe = () => {
        authAPI.getAuthMe()
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={getAuthMe}>get AuthMe</button>
    </div>
}

export const Login = () => {
    const [state, setState] = useState<PostResponseLoginType>();
    const [isLogin, setIsLogin]=useState(true);


    useEffect(()=>{
        authAPI.getAuthMe()
            .then((res) => {
                if(res.data.resultCode === 0) setIsLogin(true)
                else setIsLogin(false)
            })
    },[isLogin])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            authAPI.login(values)
                .then((res) => {
                    setState(res.data)
                    setIsLogin(true)
                })
        },
    });


    return <div>
        <div>{JSON.stringify(state)}</div>
        <form onSubmit={formik.handleSubmit}
              style={{display:'flex', flexDirection:'column', width:'20%', gap:'10px'}}>
            <input
                placeholder='email'
                {...formik.getFieldProps('email')}
            />
            <input
                placeholder='password'
                type='password'
                {...formik.getFieldProps('password')}
            />
            <div>
                <input
                    type='checkbox'
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                /> <label>remember me</label>
            </div>
            <button type={"submit"} disabled={isLogin}>Login</button>
        </form>
    </div>
}

export const Logout=()=>{
    const [state, setState] = useState<DeleteResponseLogoutType>();

    const logout = () => {
        authAPI.logout()
            .then((res) => {
                setState(res.data)
            })
    }
    return<div>
        <div>{JSON.stringify(state)}</div>
        <button onClick={logout}>logout AuthMe</button>
    </div>
}