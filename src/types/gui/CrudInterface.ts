export type ActionsList =
    |   `list`
    |   `create`
    |   `report`

export type ActionsUnique =
    |   `update`
    |   `unique`
    |   `report`
    |   `delete`


export type ActionType = `page` | `modal` | `download`

export interface ActionCrudInterface {
    label:      string;
    ico:        any;
    path:       string;
    use:        ActionType;
    id?:        string;
} 

export interface PermitObject {
    list: string;
    create: string;
    unique: string;
    report: string;
    update: string;
    delete: string;
}

export interface ResposneAbstractCrud {
    header: string[],
    title: string,
    actions: ActionCrudInterface[],
    actionsUnique: ActionCrudInterface[]
}

export interface ResposneAbstractUniqueCrud {
    header: string[],
    title: string,
    actions: ActionCrudInterface[],
    actionsUnique: ActionCrudInterface[],
    dataList: string[],
    body: any
}
