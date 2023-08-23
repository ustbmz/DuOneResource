function enumerable(target: any, key: string, descriptor: PropertyDescriptor) {
    // console.log(target, key, descriptor);
    descriptor.enumerable = true;
}

function useless(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function () {
        console.warn(key + "方法已过期");
    }
}

class A {


    @enumerable
    @useless
    method1() {
        console.log("method1");
    }

    @enumerable
    method2() {

    }
}

const a = new A();
a.method1();