import { type } from "os";

interface User {
    loginId: string
    loginpwd: string
}

interface Article {
    title: string
    publishDate: Date
}

//将User的所有属性值类型变成字符串，得到一个新类型
type String<T> = {
    [p in keyof T]: string
}

type Readonly<T> = {
    readonly [p in keyof T]: T[p]
}

type Partial<T> = {
    [p in keyof T]?: T[p]
}

const u: String<Article> = {
    title: "Sfsdf",
    publishDate: "sdf"
}