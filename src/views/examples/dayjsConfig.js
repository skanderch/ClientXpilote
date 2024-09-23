// src/utils/dayjsConfig.js
import dayjs from 'dayjs';
import isToday from 'dayjs-plugin-is-today';

dayjs.extend(isToday);

export default dayjs;
