const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('');
}

const formatTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
}

const titleFmt = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',]
  const week = weekArr[date.getDay()];
  return month + '月' + day + '日 ' + week;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  titleFmt: titleFmt
}
