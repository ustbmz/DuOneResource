import "reflect-metadata";
import { MovieService } from "./services/MovieService";

const condi: any = {
    page: 3,
    limit: 5,
    key: "10"
};
MovieService.find(condi).then(result => {
    if (result.errors.length > 0) {
        console.log(result.errors);
    }
    else {
        result.data.forEach(m => {
            console.log(m.name);
        });
        console.log("总数：" + result.count);
    }
});
