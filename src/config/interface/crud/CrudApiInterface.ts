import { Form } from "../current/generic/FormGuiInterface";

export type ObjectNameType = `user` | `city` | `country` | `state` | `subscription` | `payment` | `coin` | `permit`;

export type ActionsCrudType = `create` | `update` | `delete` | `list` | `show` | `search`;

// lista
export interface ActionListInterface {
    label:  any[];
    header: string[];
    count:  number;
    list:   any[];
}

// eliminar
export interface ActionDeleteInterface {
    label: string;
    alert: boolean;
}

// crear
export interface ActionCreateInterface {
    label:  string;
    form:  Form;
}

// actualizar
export interface ActionShowInterface {
    header: string[];
    label:  string[];
}

// actualizar
export interface ActionUpdateInterface {
    label:  string;
    form:  Form;
}

// search null por ahora
export interface ActionSearchInterface {
    label:  string;
    param:  string;
}

export interface ActionCrudInterface {
    action:     ActionsCrudType;
    create?:    ActionCreateInterface;
    list?:      ActionListInterface;
    delete?:    ActionDeleteInterface;
    update?:    ActionUpdateInterface;
    search?:    ActionSearchInterface;
    show?:      ActionShowInterface
}

export interface ActionCrudInterface {
    action:     ActionsCrudType;
    create?:    ActionCreateInterface;
    list?:      ActionListInterface;
    delete?:    ActionDeleteInterface;
    update?:    ActionUpdateInterface;
    search?:    ActionSearchInterface;
    show?:      ActionShowInterface;
}

// req.query
export interface CrudQueryParams {
    objectId?: string;
    objectName: ObjectNameType;
}

export interface CrudResponseInterface {
    actions: ActionCrudInterface[];
    path: PathApiUrl,
    title: string
}

export interface PathApiUrl {
    create:     string;
    update:     (id: string) => string;
    delete:     (id: string) => string;
    find:       (id: string) => string;
    list:       string;
}

