function getUserName():string | number {
    if (Math.random() < 0.5) {
        return "yuan jin";
    }
    return 404;
}

let myname = getUserName();
if (typeof myname === "string") {
    myname = myname.split(" ")
        .filter(it => it)
        .map(it => it[0].toUpperCase() + it.substr(1))
        .join(" ");
}


