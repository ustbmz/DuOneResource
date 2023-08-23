export interface IFireShow {
    singleFire(): void;
    doubleFire(): void;
}

export interface IWisdomShow {
    suanshuti(): void;
    dance(): void
}

export interface IBalanceShow {
    dumuqiao(): void;
    zougangsi(): void;
}

export function hasFireShow(ani: object): ani is IFireShow {
    if ((ani as IFireShow).singleFire && (ani as IFireShow).doubleFire) {
        return true;
    }
    return false;
}

export function hasWisdomShow(ani: object): ani is IWisdomShow{
    if((ani as IWisdomShow).dance && (ani as IWisdomShow).suanshuti){
        return true;
    }
    return false;
}