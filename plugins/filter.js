import Vue from 'vue'
import moment from 'moment-timezone'
/**
 * date format
 * @param {Date} date
 * @param {String} format
 * @return {String} formatted date
 */
const date = (date, format = 'YYYY-MM-DD') => {
  const dateObj = moment(date)
  return dateObj.isValid() ? dateObj.format(format) : ''
}

const filters = {
  date
}

for (const propName of Object.getOwnPropertyNames(filters)) {
  if (filters[propName] instanceof Function) {
    Vue.filter(propName, filters[propName])
  }
}
