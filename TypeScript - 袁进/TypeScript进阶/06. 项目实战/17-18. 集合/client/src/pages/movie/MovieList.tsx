import MovieTable, { IMovieTableEvents } from "../../components/MovieTable"
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers/RootReducer";
import { Dispatch } from "react";
import MovieAction from "../../redux/actions/MovieAction";
import { IMovieState } from "../../redux/reducers/MovieReducer";

function mapStateToProps(state: IRootState): IMovieState {
    return state.movie;
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ""
            }))
        },
        onSwitchChange(type, newState, id) {
            dispatch(MovieAction.changeSwitch(type, newState, id));
        },
        async onDelete(id) {
            await dispatch(MovieAction.deleteMovie(id))
        },
        onChange(newPage) {
            dispatch(MovieAction.fetchMovies({
                page: newPage
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)

// 仓库里面有数据，但没有界面

// MovieTable组件有界面，但是没有数据

// react-redux