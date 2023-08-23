import axios from "axios";
import { IResponseData, IResponseError, ISearchCondition, IResponsePageData } from "./CommonTypes";
export interface IMovie {
    _id?: string
    name: string
    types: string[];
    areas: string[];
    timeLong: number;
    isHot: boolean;
    isComing: boolean;
    isClassic: boolean;
    description?: string;
    poster?: string;
}

export class MovieService {

    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post("/api/movie", movie)
        return data;
    }

    public static async edit(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put("/api/movie/" + id, movie);
        return data;
    }

    public static async delete(id: string): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.delete("/api/movie/" + id);
        return data;
    }

    public static async getMovieById(id: string): Promise<IResponseData<IMovie | null>> {
        const { data } = await axios.get("/api/movie/" + id);
        return data;
    }

    public static async getMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie>> {
        return new Promise(resolve => {
            setTimeout(async () => {
                const { data } = await axios.get("/api/movie", {
                    params: condition
                });
                resolve(data)
            }, 1500);
        })
    }
}