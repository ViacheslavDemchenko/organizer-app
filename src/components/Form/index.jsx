import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../redux/slices/taskSlice';

import style from './Form.module.scss';

export const Form = () => {
  const [newTaskText, setNewTaskText] = useState('');

  const calendarDate = useSelector((state) => state.tasks.calendarDate);
  const formYear = calendarDate.year;
  const formMonth = calendarDate.month;
  const formDay = calendarDate.day;

  const editedTask = useSelector((state) => state.tasks.editTask);

  const dispatch = useDispatch();

  useEffect(() => {
    setNewTaskText(editedTask);
  }, [editedTask]);

  const newTaskTextHandler = e => {
    setNewTaskText(e.target.value);
  };

  const handlerSubmit = e => {
    e.preventDefault();

    const newTask = {
      id: new Date().getTime(),
      taskText: newTaskText,
      completed: false,
      year: formYear,
      month: formMonth,
      day: formDay
    };

    if (newTaskText !== '') {
      dispatch(addNewTask(newTask));

      setNewTaskText('');
    }

  };

  return (
    <div className={style.formWrap}>
      <h2 className={style.formTitle}>Добавить новое задание</h2>
      <form className={style.form}>
        <textarea
          className={style.message} 
          value={newTaskText}
          onChange={newTaskTextHandler}
        />
        <button 
          className={style.btn} 
          onClick={handlerSubmit}
          >
          Добавить
        </button>
      </form>
    </div>
  )
}
