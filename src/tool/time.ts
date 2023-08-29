// 返回当前时间戳
export function TimeNowInTimeZone(): number {
    return Math.round(new Date().getTime() / 1000);
}