import React from "react"
import ImgUploader from "../components/ImgUploader";

export default class extends React.Component {

    state = {
        img: ""
    }

    render() {
        return (
            // <h1>
            //     欢迎使用电影管理系统
            // </h1>
            <ImgUploader value={this.state.img}
                onChange={newurl => {
                    this.setState({
                        img: newurl
                    })
                }}
            />
        );
    }
}