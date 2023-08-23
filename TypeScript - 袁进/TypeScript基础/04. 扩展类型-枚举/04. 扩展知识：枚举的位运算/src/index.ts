enum Permission {
    Read = 1,   // 0001
    Write = 2,  // 0010
    Create = 4, // 0100
    Delete = 8  // 1000
}

//1. 如何组合权限
//使用或运算
//0001
//或
//0010
//0011
let p: Permission = Permission.Read | Permission.Write;

//2. 如何判断是否拥有某个权限
//0011
//且
//0010
//0010
function hasPermission(target: Permission, per: Permission) {
    return (target & per) === per;
}
//判断变量p是否拥有可读权限

//3. 如何删除某个权限
//0011
//异或
//0010
//0001
p = p ^ Permission.Write;
console.log(hasPermission(p, Permission.Write));