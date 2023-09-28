export const numberFormatter = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num
}

export const prettyTruncate = (str = '', len = 8, type?: string) => {
  if (str && str.length > len) {
    if (type === 'address') {
      if (str.length !== len + 1) {
        const front = Math.ceil(len / 2)
        const back = str.length - (len - front)
        return `${str.slice(0, front)}...${str.slice(back)}`
      }
      return str
    }
    return `${str.slice(0, len)}...`
  }
  return str
}

export const toMl = (secs: number) => {
  return parseInt(`${secs}000`)
}

export const mlToSec = (ml: number) => {
  const parseToSec = ml.toString()
  return parseInt(parseToSec.slice(0, -3))
}

export const generateRandomNumber = () => {
  const min = 1000000000000
  const max = 9999999999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}
