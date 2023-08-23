import { IAction } from "./ActionTypes";
import { IMovie, MovieService } from "../../services/MovieService";
import { ISearchCondition, SwitchType } from "../../services/CommonTypes";
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers/RootReducer";

export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[]
    total: number
}>;

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_setCondition", ISearchCondition>

function setConditionAction(condition: ISearchCondition): SetConditionAction {
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>

function deleteAction(id: string): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}

export type MovieChangeSwitchAction = IAction<"movie_switch", {
    type: SwitchType
    newVal: boolean
    id: string
}>

function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitchAction {
    return {
        type: "movie_switch",
        payload: {
            type,
            newVal,
            id
        }
    }
}

export type MovieActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction | MovieChangeSwitchAction;

//根据条件从服务器获取电影的数据
function fetchMovies(condition: ISearchCondition)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        //1. 设置加载状态
        dispatch(setLoadingAction(true));
        //2. 设置条件
        dispatch(setConditionAction(condition));
        //3. 获取服务器数据
        const curCondition = getState().movie.condition;
        const resp = await MovieService.getMovies(curCondition);
        //4. 更改仓库的数据
        dispatch(saveMoviesAction(resp.data, resp.total));
        //关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function deleteMovie(id: string)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        dispatch(setLoadingAction(true));
        await MovieService.delete(id);
        dispatch(deleteAction(id));//删除本地仓库中的数据
        dispatch(setLoadingAction(false));
    }
}

function changeSwitch(type: SwitchType, newVal: boolean, id: string)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        dispatch(changeSwitchAction(type, newVal, id));
        await MovieService.edit(id, {
            [type]: newVal
        })
    }
}

export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie,
    changeSwitchAction,
    changeSwitch
}