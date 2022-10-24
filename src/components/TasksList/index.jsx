import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TasksItem } from '../TasksItem';

import style from './TaskList.module.scss';

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const TasksList = () => {
  const calendarDate = useSelector((state) => state.tasks.calendarDate);
  const currentDayNotes = useSelector((state) => state.tasks.dayTasks);
  const allTasks = useSelector((state) => state.tasks.tasks);
  const isMounted = useRef(false);
  let month;

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(allTasks);
      localStorage.setItem('tasks', json);
    } 
    isMounted.current = true;
  }, [allTasks]);

  if (calendarDate.month && calendarDate.month < 10) {
    month = +calendarDate.month[1];
  } else {
    month = calendarDate.month;
  }

  const choosenDate = `${calendarDate.day} ${months[month - 1]} ${calendarDate.year}`;

  return (
    <div className={style.taskListWrap}>
      {currentDayNotes.length ? <h2 className={style.taskListTitle}>Задания на {choosenDate} года </h2> : null}
      <div className={style.listWrap}>
        <div className={style.taskList}>
          {
            currentDayNotes.length ? currentDayNotes.map(task => (
              <TasksItem 
                key={task.id}
                text={task.taskText}
                id={task.id}
                completed={task.completed}
              />
            )) : <h2 className={style.taskListTitle}>Заданий на {choosenDate} года нет</h2>
          }
        </div>
      </div>
    </div>
  );
}
