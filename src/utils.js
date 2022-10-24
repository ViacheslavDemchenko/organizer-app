const dateFormatting = (dateNonFormatted) => {
  let year = dateNonFormatted.getFullYear();
  let month = dateNonFormatted.getMonth() + 1;
  let day = dateNonFormatted.getDate();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return {
    year,
    month,
    day
  }
};

const getTasksFromLS = () => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : {};
};

export { dateFormatting, getTasksFromLS };