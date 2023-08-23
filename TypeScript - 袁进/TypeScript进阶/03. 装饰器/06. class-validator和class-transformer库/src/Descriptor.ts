import "reflect-metadata";

const key = Symbol.for("descriptor");

export function descriptor(description: string) {
    return Reflect.metadata(key, description)
}

export function printObj(obj: any) {
    const cons = Object.getPrototypeOf(obj);
    //输出类的名字
    if (Reflect.hasMetadata(key, cons)) {
        console.log(Reflect.getMetadata(key, cons));
    }
    else {
        console.log(cons.constructor.name);
    }
    //输出所有的属性描述和属性值
    for (const k in obj) {
        if (Reflect.hasMetadata(key, obj, k)) {
            console.log(`\t${Reflect.getMetadata(key, obj, k)}:${obj[k]}`)
        }
        else {
            console.log(`\t${k}:${obj[k]}`)
        }
    }
}