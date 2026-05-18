export const formatDate = (arr)=>{
    const [year,month,date] = arr;
    return `${date} - ${month} - ${year}`
}

export const formatTime = (arr)=>{
    const [hour,minute] = arr;
    return `${hour >9 ? "" :0}${hour} : ${minute >9 ? "" :0}${minute}`
}

export const arrayToDate = (dateArr) => {
  const [year, month, day] = dateArr;
  return new Date(year, month - 1, day);
};