export interface IAction<T extends string, P> {
    type: T
    payload: P
}