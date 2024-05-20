import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6f86b70c-d3ce-46fc-9255-2dc0a7f5ea99'
    }
}

export type GetResponseToDoListType = {
    id: string
    addedDate: string
    order: number
    title: string
};

export  type ItemsTaskType = {
        id: string
        title: string
        description: string
        todoListId: string
        order: number
        status: number
        priority: number
        startDate: string
        deadline: string
        addedDate: string
}

export type GetResponseTaskType = {

    items: Array<ItemsTaskType>

    totalCount: number
    error: string

}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type CreateResponseToDoListType = ResponseType<{ item: GetResponseToDoListType }>
export type DeleteResponseToDoListType = ResponseType<{}>
export type UpdateResponseToDoListType = ResponseType<{}>

export type DeleteResponseTaskType = ResponseType<{}>
export type UpdateResponseTaskType = ResponseType<{ item: ItemsTaskType }>
export type CreateResponseTaskType = ResponseType<{ item: ItemsTaskType }>


export const toDoListsAPI = {
    getToDoLists() {
        return axios.get<Array<GetResponseToDoListType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },

    createToDoLists(title: string) {
        return axios.post<CreateResponseToDoListType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },

    deleteToDoLists(id: string) {
        return axios.delete<DeleteResponseToDoListType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },

    updateToDoLists(id: string, title: string) {
        return axios.put<UpdateResponseToDoListType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    },


    getTasks(idToDoLost: string) {
        return axios.get<GetResponseTaskType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idToDoLost}/tasks`, settings)
    },

    createTasks(idToDoLost: string, title: string) {
        return axios.post<CreateResponseTaskType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idToDoLost}/tasks`, {title}, settings)
    },

    deleteTasks(idToDoLost: string, idTask: string) {
        return axios.delete<DeleteResponseTaskType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idToDoLost}/tasks/${idTask}`, settings)
    },

    updateTasks(idToDoLost: string, idTask: string, title: string) {
        return axios.put<UpdateResponseTaskType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idToDoLost}/tasks/${idTask}`, {title}, settings)
    },

}