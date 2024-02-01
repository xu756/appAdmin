export const getCookie = (param: string) => {
    let value = '';
    if (document.cookie.length > 0) {
        const arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
            const arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === param) {
                value = arr2[1];
                //保存到保存数据的地方
            }
        }
        return value;
    }
};
