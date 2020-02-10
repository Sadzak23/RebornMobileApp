export const add0 = (num) => ("0" + num).slice(-2);
export const formatSeconds = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${add0(minutes)}:${add0(seconds)}`;
  }
  else {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return `${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
  }
};
export const formatMinutes = (min) => {
  if (min >= 60) {
    const hours = Math.floor(min / 60);
    min = min % 60;
    return `${hours}h:${add0(min)}`;
  }
  else {
    return min;
  }
};

export const formatDateEU = (timestamp) => {
  const day = new Date(timestamp).getDate()
  const month = new Date(timestamp).getMonth() + 1
  const year = new Date(timestamp).getFullYear()
  return `${day}.${month}.${year}.`
}

export const formatDate_DD_MM_YYYY = (timestamp) => {
  const day = new Date(timestamp).getDate()
  const month = new Date(timestamp).getMonth()
  const year = new Date(timestamp).getFullYear()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  return `${add0(day)}.${months[month]}.${year}.`
}

export const getAge = (timestamp) => {
  const ageDif = new Date(Date.now() - timestamp)
  return ageDif.getFullYear() - 1970
}

export const resizeGooglePhoto = (url, size) => url.split('=')[0] + `=s${size}`