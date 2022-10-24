import close from '../../assets/img/close.svg';
import check from '../../assets/img/check.svg';
import edit from '../../assets/img/edit.svg';

import { useDispatch } from 'react-redux';

import { completeTask, deleteTask, editTask } from '../../redux/slices/taskSlice';

import style from './TaskItem.module.scss';


export const TasksItem = ({id, text, completed}) => {
  const dispatch = useDispatch();

  const onChangeComplete = id => {
    dispatch(completeTask(id));
  };

  const onChangeDelete = id => {
    dispatch(deleteTask(id));
  };

  const onChangeEdit = id => {
    dispatch(editTask(id));
  };

  return (
    <>
      <div className={style.taskItem}>
        <p className={completed ? 'completed' : ''}>{text}</p>
        <div className={style.btnWrap}>
          <button className={style.btnHandleTask} onClick={() => onChangeComplete(id)}>
            <span className={style.btnHandleTask__tooltip}>Выполнено</span>
            <img src={check} alt="Указать как выполненное" width="22" height="22" />
          </button>
          <button className={style.btnHandleTask} onClick={() => onChangeEdit(id)}>
          <span className={style.btnHandleTask__tooltip}>Редактировать</span>
            <img src={edit} alt="Удалить задание" width="10" height="10" />
          </button>
          <button className={style.btnHandleTask} onClick={() => onChangeDelete(id)}>
          <span className={style.btnHandleTask__tooltip}>Удалить</span>
            <img src={close} alt="Удалить задание" width="20" height="20" />
          </button>
        </div>
      </div>
    </>
  );
}
