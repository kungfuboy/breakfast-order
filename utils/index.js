import dayjs from "dayjs";

export const getWeek = () => {
    const week = []
    // 如果 当天不是 0 ，将基准日期设为下周日，否则将当前日期设为基准日期
    let Stamp = dayjs().day() ? dayjs().add(7 - dayjs().day(), 'day') : dayjs()
    for (let i = 0; i < 7; i++) {
        Stamp = Stamp.add(1, 'day')
        week[i] = `${Stamp.get('month') + 1}月${Stamp.get('date')}日`;
    }
    return week;
};