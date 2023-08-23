// class User {
//     static users: User[] = [];

//     constructor(
//         public loginId: string,
//         public loginPwd: string,
//         public name: string,
//         public age: number
//     ) {
//         //需要将新建的用户加入到数组中
//         User.users.push(this);
//     }

//     sayHello() {
//         console.log(`大家好，我叫${this.name}，今年${this.age}岁了，我的账号是${this.loginId}`)
//     }

//     static login(loginId: string, loginPwd: string): User | undefined {
//         return this.users.find(u => u.loginId === loginId && u.loginPwd === loginPwd)
//     }
// }

// new User("u1", "123", "王富贵", 11);
// new User("u2", "123", "坤坤", 18);
// new User("u3", "123", "旺财", 22);

// const result = User.login("u3", "123");
// if(result){
//     result.sayHello();
// }
// else{
//     console.log("登录失败，账号或密码不正确")
// }


class Board {
    width: number = 500;
    height: number = 700;

    init() {
        console.log("初始化棋盘");
    }

    private constructor() { }

    private static _board;

    static createBoard(): Board {
        if (this._board) {
            return this._board;
        }
        this._board = new Board();
        return this._board;
    }
}

const b1 = Board.createBoard();
const b2 = Board.createBoard();
console.log(b1 === b2);