
export interface ActionSlideInterface {
    label:      string;
    ico:        any;
    path:       string;
} 

export interface ActionSlideInterfaceChilds {
    label:      string;
    ico:        any;
    path:      string;
    childs:     ActionSlideInterfaceChilds[]
} 

export interface ResponseActionSlide {
    body:       ActionSlideInterfaceChilds[];
    message:    string;
    error:      boolean;

}
