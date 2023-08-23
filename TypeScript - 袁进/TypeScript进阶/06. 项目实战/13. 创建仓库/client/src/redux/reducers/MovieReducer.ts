import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../services/CommonTypes";
import { MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction, DeleteAction } from "../actions/MovieAction";
import { Reducer } from "react";

// 描述电影列表的状态类型

export type IMovieCondition = Required<ISearchCondition>

/**
 * 电影状态
 */
export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[]
    /**
     * 查询条件
     */
    condition: IMovieCondition
    /**
     * 总记录数
     */
    total: number
    /**
     * 是否正在加载数据
     */
    isLoading: boolean
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false
}

type MovieReducer<A> = Reducer<IMovieState, A>

const saveMovie: MovieReducer<SaveMoviesAction> = function (state, action) {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total
    };
}

const setCondition: MovieReducer<SetConditionAction> = function (state, action) {
    return {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    };
}

const setLoading: MovieReducer<SetLoadingAction> = function (state, action) {
    return {
        ...state,
        isLoading: action.payload
    };
}

const deleteMovie: MovieReducer<DeleteAction> = function (state, action) {
    return {
        ...state,
        data: state.data.filter(m => m._id !== action.payload),
        total: state.total - 1
    }
}


export default function (state: IMovieState = defaultState, action: MovieActions) {
    // 可辨识联合
    switch (action.type) {
        case "movie_delete":
            return deleteMovie(state, action);
        case "movie_save":
            return saveMovie(state, action);
        case "movie_setCondition":
            return setCondition(state, action);
        case "movie_setLoading":
            return setLoading(state, action);
        default:
            return state;
    }
}