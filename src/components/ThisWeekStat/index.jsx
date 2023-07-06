import React from 'react';
import Stat from 'src/components/Stat';
import useActivities from 'src/hooks/useActivities';
import useHover from 'src/hooks/useHover';
import { formatPace } from 'src/utils/utils';
import styles from './style.module.scss';

const ThisWeekStat = ({ year, onClick }) => {
  let { activities: runs } = useActivities();

  // 获取当前日期的星期几
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // 0 表示星期日，1 表示星期一，以此类推

  // 计算本周的起始日期（以星期一为第一天）
  const startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDayOfWeek + 1));
  const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  // 过滤符合条件的数据
  runs = runs.filter((run) => {
    const runDate = new Date(run.start_date_local);
    return runDate >= startDate && runDate <= endDate;
  });

  console.log(runs)

  let sumDistance = 0;
  let streak = 0;
  let pace = 0; // eslint-disable-line no-unused-vars
  let paceNullCount = 0; // eslint-disable-line no-unused-vars
  let heartRate = 0;
  let heartRateNullCount = 0;
  let totalMetersAvail = 0;
  let totalSecondsAvail = 0;
  runs.forEach((run) => {
    sumDistance += run.distance || 0;
    if (run.average_speed) {
      pace += run.average_speed;
      totalMetersAvail += run.distance || 0;
      totalSecondsAvail += (run.distance || 0) / run.average_speed;
    } else {
      paceNullCount++;
    }
    if (run.average_heartrate) {
      heartRate += run.average_heartrate;
    } else {
      heartRateNullCount++;
    }
    if (run.streak) {
      streak = Math.max(streak, run.streak);
    }
  });
  sumDistance = parseFloat((sumDistance / 1000.0).toFixed(1));
  const avgPace = formatPace(totalMetersAvail / totalSecondsAvail);
  const hasHeartRate = !(heartRate === 0);
  const avgHeartRate = (heartRate / (runs.length - heartRateNullCount)).toFixed(
    0
  );
  return (
    <div
      style={{ cursor: 'pointer' }}
      //onClick={() => onClick(year)}
    >
      <section>
        <Stat value={year} description=" Journey" />
        <Stat value={runs.length} description=" Runs" />
        <Stat value={sumDistance} description=" KM" />
        <Stat value={avgPace} description=" Avg Pace" />
        <Stat value={`${streak} day`} description=" Streak" />
        {hasHeartRate && (
          <Stat value={avgHeartRate} description=" Avg Heart Rate" />
        )}
      </section>
      <hr color="red" />
    </div>
  );
};

export default ThisWeekStat;
