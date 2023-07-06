import React from 'react';
import YearStat from 'src/components/YearStat';
import ThisWeekStat from 'src/components/ThisWeekStat';
import ThisMonthStat from 'src/components/ThisMonthStat';
import useActivities from 'src/hooks/useActivities';
import { INFO_MESSAGE } from 'src/utils/const';

const YearsStat = ({ year, onClick }) => {
  const { years } = useActivities();
  // make sure the year click on front
  let yearsArrayUpdate = years.slice();
  yearsArrayUpdate.push('Total');
  yearsArrayUpdate = yearsArrayUpdate.filter((x) => x !== year);
  yearsArrayUpdate.unshift(year);

  // for short solution need to refactor
  return (
    <div className="fl w-100-l pb5 pr5-l">
      <section className="pb4" style={{ paddingBottom: '0rem' }}>
        <p style={{ lineHeight: 1.8 }}>
          {INFO_MESSAGE(years.length, year)}
          <br />
        </p>
      </section>
      <hr color="red" />
      <ThisWeekStat key="ThisWeek" year="ThisWeek" onClick={onClick} />
      <ThisMonthStat key="ThisMonth" year="ThisMonth" onClick={onClick} />
      {yearsArrayUpdate.map((year) => (
        <YearStat key={year} year={year} onClick={onClick} />
      ))}
      {yearsArrayUpdate.hasOwnProperty('Total') ? (
        <YearStat key="Total" year="Total" onClick={onClick} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default YearsStat;
