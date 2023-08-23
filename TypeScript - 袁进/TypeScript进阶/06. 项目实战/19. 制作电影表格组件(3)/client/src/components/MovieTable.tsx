import React from "react"
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Table, Switch, Button, message, Popconfirm, Icon, Input } from "antd";
import { ColumnProps, PaginationConfig } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultposterImg from "../assets/defaultposter.png"
import { SwitchType } from "../services/CommonTypes";
import { NavLink } from "react-router-dom"

export interface IMovieTableEvents {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void
    onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
    onDelete: (id: string) => Promise<void>
    onChange: (newPage: number) => void
    onKeyChange: (key: string) => void
    onSearch: () => void
}

export default class extends React.Component<IMovieState & IMovieTableEvents> {

    componentDidMount() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    private getFilterDropDown(p: any) {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={e => this.props.onKeyChange(e.target.value)}
                    onPressEnter={this.props.onSearch}
                />
                <Button
                    type="primary"
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                    onClick={this.props.onSearch}
                >
                    搜索
                </Button>
                <Button
                    size="small"
                    style={{ width: 90 }}
                    onClick={()=>{
                        this.props.onKeyChange("")
                        this.props.onSearch();
                    }}
                >
                    重置
                </Button>
            </div>
        );
    }

    private getColumns(): ColumnProps<IMovie>[] {
        return [
            {
                title: "封面",
                dataIndex: "poster",
                render: poster => {
                    if (poster) {
                        return <img alt="" className="tablePoster" src={poster} />
                    }
                    else {
                        return <img alt="" className="tablePoster" src={defaultposterImg} />
                    }
                }
            },
            {
                title: "名称", dataIndex: "name",
                filterDropdown: this.getFilterDropDown.bind(this),
                filterIcon: <Icon type="search" />
            },
            {
                title: "地区",
                dataIndex: "areas",
                render: (text: string[]) => {
                    return text.join(", ");
                }
            },
            {
                title: "类型",
                dataIndex: "types",
                render: (text: string[]) => {
                    return text.join(", ");
                }
            },
            {
                title: "时长", dataIndex: "timeLong",
                render(timeLong) {
                    return timeLong + "分钟";
                }
            },
            {
                title: "正在热映",
                dataIndex: "isHot",
                render: (isHot, record) => {
                    return <Switch checked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isHot, record) => {
                    return <Switch checked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "经典影片",
                dataIndex: "isClassic",
                render: (isHot, record) => {
                    return <Switch checked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!);
                    }} />
                }
            },
            {
                title: "操作",
                dataIndex: "_id",
                render: (id: string) => {
                    return (
                        <div>
                            <NavLink to={"/movie/edit/" + id}>
                                <Button type="primary" size="small">编辑</Button>
                            </NavLink>
                            <Popconfirm title="确定要删除吗?" onConfirm={async () => {
                                await this.props.onDelete(id);
                                message.success('删除成功');
                            }} okText="确定" cancelText="取消">
                                <Button type="danger" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }

    getPageConfig(): PaginationConfig | false {
        if (this.props.total === 0) {
            return false;
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total
        };
    }

    handleChange(pagination: PaginationConfig) {
        this.props.onChange(pagination.current!);
    }

    render() {
        return (
            <Table
                rowKey="_id" dataSource={this.props.data}
                columns={this.getColumns()}
                pagination={this.getPageConfig()}
                onChange={this.handleChange.bind(this)}
                loading={this.props.isLoading}
            ></Table>
        );
    }
}