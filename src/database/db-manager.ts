import { Todo, TodoList } from "src/todos/entities"
import { DataSource } from "typeorm"

export const dataSources = {
    "id1": new DataSource({
        type: "sqlite",
        database: "db1.sqlite",
        synchronize:true,
        entities: [TodoList, Todo]
    }),
    "id2": new DataSource({
        type: "sqlite",
        database: "db1.sqlite",
        synchronize:true,
        entities: [TodoList, Todo]
    })
}

function getAndConnect(id: string) {
    return dataSources[id].initialize()
}

dataSources["id1"].driver.disconnect()

function initDataSources() {
    //Fetch all data
    //For each (create a data source) ^ push to dataSources
}