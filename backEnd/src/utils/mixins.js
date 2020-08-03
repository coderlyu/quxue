import { dateFormat } from './util'
export default {
  filters: {
    filterTime (time) {
      return dateFormat('YYYY-mm-dd HH:MM', time)
    }
  }
}
