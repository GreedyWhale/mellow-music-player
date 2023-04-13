/*
 * @Description: 日期相关函数
 * @Author: MADAO
 * @Date: 2023-04-10 17:11:08
 * @LastEditors: MADAO
 * @LastEditTime: 2023-04-10 17:12:24
 */
import dayjs from "dayjs";

export const formatDate = (date: Parameters<typeof dayjs>[0]) => dayjs(date).format('YYYY-MM-DD hh:mm:ss');