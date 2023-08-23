
export function classDescriptor(description: string) {
    return function (target: Function) {
        //保存到该类的原型中
        target.prototype.$classDescription = description;
    }
}

export function propDescriptor(description: string) {
    return function (target: any, propName: string) {
        //把所有的属性信息保存到该类的原型中
        if (!target.$propDescriptions) {
            target.$propDescriptions = [];
        }
        target.$propDescriptions.push({
            propName,
            description
        });
    }
}

export function printObj(obj: any) {
    //输出类的名字
    if (obj.$classDescription) {
        console.log(obj.$classDescription);
    }
    else {
        console.log(Object.getPrototypeOf(obj).constructor.name);
    }
    if (!obj.$propDescriptions) {
        obj.$propDescriptions = [];
    }
    //输出所有的属性描述和属性值
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const prop = obj.$propDescriptions.find((p: any) => p.propName === key);
            if (prop) {
                console.log(`\t${prop.description}:${obj[key]}`)
            }
            else {
                console.log(`\t${key}:${obj[key]}`)
            }
        }
    }
}