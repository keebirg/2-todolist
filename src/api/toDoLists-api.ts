import axios from "axios";


const instance=axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '6f86b70c-d3ce-46fc-9255-2dc0a7f5ea99'
    }
})

export type ToDoListServerType = {
    id: string
    addedDate: string
    order: number
    title: string
};

export enum TaskStatus{
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriority{
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export  type TaskTypeAPI = {
        id: string
        title: string
        description: string
        todoListId: string
        order: number
        status: TaskStatus
        priority: TaskPriority
        startDate: string
        deadline: string
        addedDate: string
}

export type GetResponseTaskType = {
    items: Array<TaskTypeAPI>
    totalCount: number
    error: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type DataToUpdateType={
    title: string
    status: TaskStatus
    priority: TaskPriority
}

export type CreateResponseToDoListType = ResponseType<{ item: ToDoListServerType }>
export type DeleteResponseToDoListType = ResponseType<{}>
export type UpdateResponseToDoListType = ResponseType<{}>

export type DeleteResponseTaskType = ResponseType<{}>
export type UpdateResponseTaskType = ResponseType<{ item: TaskTypeAPI }>
export type CreateResponseTaskType = ResponseType<{ item: TaskTypeAPI }>


export const toDoListsAPI = {
    getToDoLists() {
        return instance.get<Array<ToDoListServerType>>('todo-lists')
    },

    createToDoList(title: string) {
        return instance.post<CreateResponseToDoListType>('todo-lists', {title})
    },

    deleteToDoList(id: string) {
        return instance.delete<DeleteResponseToDoListType>(`todo-lists/${id}`)
    },

    updateToDoList(id: string, title: string) {
        return instance.put<UpdateResponseToDoListType>(`todo-lists/${id}`, {title})
    },


    getTasks(idToDoLost: string) {
        return instance.get<GetResponseTaskType>(`todo-lists/${idToDoLost}/tasks`)
    },

    createTask(idToDoLost: string, title: string) {
        return instance.post<CreateResponseTaskType>(`todo-lists/${idToDoLost}/tasks`, {title})
    },

    deleteTask(idToDoLost: string, idTask: string) {
        return instance.delete<DeleteResponseTaskType>(`todo-lists/${idToDoLost}/tasks/${idTask}`)
    },

    updateTask(idToDoLost: string, idTask: string, DataToUpdate: DataToUpdateType) {
        return instance.put<UpdateResponseTaskType>(`todo-lists/${idToDoLost}/tasks/${idTask}`, DataToUpdate)
    },

}