import React from "react"
import { RouteComponentProps } from "react-router";
import MovieForm from "../../components/MovieForm";
import { MovieService, IMovie } from "../../services/MovieService";

interface IParams {
    id: string
}

interface EditPageState {
    movie?: IMovie
}

export default class extends React.Component<RouteComponentProps<IParams>, EditPageState> {
    state: EditPageState = {
        movie: undefined
    }

    async componentDidMount() {
        const resp = await MovieService.getMovieById(this.props.match.params.id);
        if (resp.data) {
            this.setState({
                movie: resp.data
            })
        }
    }

    render() {
        return (
            <MovieForm
                movie={this.state.movie}
                onSubmit={async movie => {
                    const resp = await MovieService.edit(this.props.match.params.id, movie)
                    if (resp.data) {
                        return "";
                    }
                    else {
                        return resp.err;
                    }
                }}></MovieForm>
        );
    }
}