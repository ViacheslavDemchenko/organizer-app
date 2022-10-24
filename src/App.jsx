import { useState, useCallback, useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { calendarDateOnChange } from "./redux/slices/taskSlice";
import { dateFormatting } from "./utils";
import "react-calendar/dist/Calendar.css";
import "./App.scss";

import { TasksList } from "./components/TasksList";
import { Form } from "./components/Form";

export const App = () => {
  const [date, setDate] = useState(new Date());
  const currentMonthNotes = useSelector((state) => state.tasks.tasks);
  const tasks = useSelector((state) => state.tasks);
  const currentYear = useSelector((state) => state.tasks.calendarDate.year);
  const currentMonth = useSelector((state) => state.tasks.calendarDate.month);
  let datesWithTasks = [];

  if (currentMonthNotes && Object.keys(currentMonthNotes).length > 0) {
    if (currentMonthNotes[currentYear]) {
      if (currentMonth && currentMonthNotes[currentYear][currentMonth]) {
        let keys = Object.keys(currentMonthNotes[currentYear][currentMonth]);

        keys.forEach((key) => {
          let nextKey = +key;

          if (nextKey < 10) {
            nextKey = '0' + nextKey;
          }

          datesWithTasks.push(
            `${nextKey}.${currentMonth}.${currentYear}`
          );
        });
      } else {
        datesWithTasks = [];
      }
    } else {
      datesWithTasks = [];
    }
  } else {
    console.log('no');
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calendarDateOnChange(dateFormatting(date)));
  }, []);

  const onChange = useCallback(
    (date) => {
      setDate(date);

      dispatch(calendarDateOnChange(dateFormatting(date)));
    },
    [date]
  );

  return (
    <div className="app">
      <div className="container">
        <h1 className="app__main-title">Organizer</h1>
        <div className="app__row">
          <div className="app__row-left">
            <h2 className="app__row-title">Выберите дату</h2>
            <div className="calendar-container">
              <Calendar
                onChange={onChange}
                value={date}
                onActiveStartDateChange={({
                  action,
                  activeStartDate
                }) => {
                  if (action) {
                    onChange(activeStartDate);
                  }
                }}
                tileClassName={({ date }) => {
                  if (
                    datesWithTasks.includes(date.toLocaleDateString('ru-RU'))
                  ) {
                    return 'highlight';
                  }
                }}
              />
            </div>
          </div>
          <Form />
        </div>
        <TasksList />
      </div>
    </div>
  );
}