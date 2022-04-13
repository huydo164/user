<template>
  <a-row>
    <a-col :span="4">
      <div class="text-center">
        <div class="status-light">
          <div
            v-for="(status, id) in LIGHTS"
            :key="id"
            class="text-center light-general"
            :class="id + 1 === getLight ? status : ''"
          />
        </div>
      </div>
      <div class="event-list">
        <ul
          v-for="event in getEventList"
          :key="event.id"
          class="event"
        >
          <a-icon
            class="pr-3 task-status"
            :class="getClassByStatus(event.status_cal)"
            :type="event.status_cal === EVENT_STATUS.done ? 'check-square' : 'exclamation-circle'"
          />
          {{ event.problem }}
        </ul>
        <div
          v-if="!loadMore && eventList.length > MAX_EVENTS"
          class="btn-load-more"
          @click="loading()"
        >
          <font-awesome-icon icon="angle-double-down" />
        </div>
      </div>
    </a-col>
    <a-col :span="20">
      <a-calendar
        :header-render="headerRender"
        @panelChange="updateLastRow"
      >
        <ul
          slot="dateCellRender"
          slot-scope="value"
          class="events"
        >
          <a-tooltip
            trigger="click"
            placement="topLeft"
            overlay-class-name="tool-tip"
            overlay-inner-style="{ background-color: 'unset' }"
          >
            <template slot="title">
              <ul
                v-for="event in getEventsInDay(value)"
                :key="event.id"
                class="event-block"
              >
                <div class="d-flex event-detail">
                  <div>
                    {{ event.problem }}
                  </div>
                  <div>
                    {{ getEndOfDate(event.start_date) }}
                  </div>
                </div>
                <div class="btn-detail">
                  <button
                    class="btn"
                    @click="goToEventDetail(event.id)"
                  >
                    {{ $t('event.detail') }}
                  </button>
                </div>
              </ul>
            </template>
            <a-icon
              v-if="getEventsInDay(value).length"
              class="task-status"
              :class="getClassIconInCalendar(value)"
              :type="getTypeIconInCalendar(value)"
              :value="getEventsInDay(value)"
            />
          </a-tooltip>
        </ul>
      </a-calendar>
    </a-col>
  </a-row>
</template>
<script>
import HeaderCalendar from '~/components/templates/HeaderCalendar.vue'

const LIGHTS = [
  'light-processing',
  'light-done',
  'light-out'
]
const EVENT_STATUS = {
  processing: 1,
  done: 2,
  outOfDate: 3
}
const EVENT_CLASS = [
  'status-processing',
  'status-done',
  'status-out'
]
const MAX_EVENTS = 7

export default {
  data() {
    return {
      eventList: [],
      now: this.$moment().startOf('day').unix(),
      loadMore: false,
      LIGHTS,
      EVENT_STATUS,
      MAX_EVENTS
    }
  },

  computed: {
    /**
     * Get light
     *
     * @return int
     */
    getLight() {
      if (this.eventList.length) {
        return this.eventList.find(event => event.status_cal === EVENT_STATUS.outOfDate) ? EVENT_STATUS.outOfDate : (this.eventList.find(event => event.status_cal === EVENT_STATUS.processing) ? EVENT_STATUS.processing : EVENT_STATUS.done)
      }

      return EVENT_STATUS.done
    },

    getEventList() {
      return (this.loadMore || this.eventList.length <= MAX_EVENTS) ? this.eventList : this.eventList.slice(0, MAX_EVENTS)
    }
  },

  watch: {
    eventList() {
      this.loadMore = false
    }
  },

  mounted() {
    this.callApiGetEventList()
  },

  methods: {
    /**
     * Call api get event list
     *
     * @params {object} conditions
     */
    async callApiGetEventList(conditions = {}) {
      try {
        const { data } = await this.$api.event.list({ params: conditions })
        this.eventList = data.data.sort((a, b) => {
          if (b.status_cal - a.status_cal && b.status_cal === EVENT_STATUS.done) {
            return -1
          }
          return b.status_cal - a.status_cal && b.status_cal
        })
      } catch (error) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      }
    },

    /**
     * Get list events in day
     *
     * @param {timestamp} datetime
     */
    getEventsInDay(datetime) {
      const startOfDay = this.$moment(datetime).startOf('day').unix()
      const endOfDay = this.$moment(datetime).endOf('day').unix()
      const events = this.eventList.filter(event => event.start_date >= startOfDay && event.start_date <= endOfDay)

      return events || []
    },

    /**
     * Go to event detail
     *
     * @param int eventId
     */
    goToEventDetail(eventId) {
      this.$router.push('/event/' + eventId)
    },

    /**
     * Get class of event by status
     *
     * @param int status
     * @return string
     */
    getClassByStatus(status) {
      return EVENT_CLASS[status - 1]
    },

    /**
     * Get end of date
     *
     * @param int datetime
     */
    getEndOfDate(datetime) {
      return this.$moment(datetime * 1000).endOf('day').format('YYYY-MM-DD HH:mm')
    },

    /**
     * Get class icon in calendar
     *
     * @param {timestamp} datetime
     * @return {string}
     */
    getClassIconInCalendar(datetime) {
      const eventsInDay = this.getEventsInDay(datetime)
      return eventsInDay.length > 1 ? 'status-list' : this.getClassByStatus(eventsInDay[0].status_cal)
    },

    /**
     * Get type icon in calendar
     *
     * @param {timestamp} datetime
     * @return {string}
     */
    getTypeIconInCalendar(datetime) {
      const eventsInDay = this.getEventsInDay(datetime)
      return eventsInDay.length > 1 ? 'unordered-list' : (eventsInDay[0].status_cal === EVENT_STATUS.done ? 'check-square' : 'exclamation-circle')
    },

    /**
     * Change loadMore
     */
    loading() {
      this.loadMore = true
    },

    /**
     * Update visibility of last row which start date is day of next month
     */
    updateLastRow() {
      setTimeout(() => {
        const rows = document.querySelectorAll('.ant-fullcalendar-tbody tr:nth-child(6)')
        if (rows.length < 1) { return }
        if (rows[0].querySelector('td').classList.contains('ant-fullcalendar-next-month-btn-day')) {
          rows[0].classList.add('hidden')
        } else {
          rows[0].classList.remove('hidden')
        }
      }, 100)
    },

    /**
     * Header render for calendar
     */
    headerRender({ value, type, onChange, onTypeChange }) {
      this.callApiGetEventList({ start_date: value.unix() })
      const month = value.month()
      const year = value.year()

      return this.$createElement(HeaderCalendar, {
        props: {
          month,
          year
        },
        on: {
          'update-month': newMonth => {
            const newValue = value.clone()
            newValue.month(parseInt(newMonth))
            onChange(newValue)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// Calendar
/deep/ {
  .ant-fullcalendar-column-header {
    text-align: center;
    border: solid 1px;
    height: 50px;
    font-size: 24px;
    background-color: #ededed;

    &[title="Sun"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Sun";
        color: #fc0000;
      }
    }
    &[title="Mon"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Mon";
      }
    }
    &[title="Tue"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Tue";
      }
    }
    &[title="Wed"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Wed";
      }
    }
    &[title="Thu"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Thu";
      }
    }
    &[title="Fri"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Fri";
      }
    }
    &[title="Sat"] {
      span {
        display: none;
        visibility: hidden;
      }
      &:after {
        content: "Sat";
        color: #fc0000;
      }
    }
  }
  .hidden {
    display: none;
    visibility: hidden;
  }
  .ant-fullcalendar-date {
    border: none;
    padding: 0;
    margin: 0;
    height: 75px;
  }
  .ant-fullcalendar-cell {
    border: solid 1px;
  }
  .ant-fullcalendar-tbody {
    .ant-fullcalendar-value {
      text-align: left;
      font-size: 20px;
      padding: 5px 0 0 5px;
    }
    .ant-fullcalendar-content {
      text-align: right;
      padding-right: 10px;
      height: unset;
    }
    td:nth-child(1),
    td:nth-last-child(1) {
      .ant-fullcalendar-value {
        color: #fc0000;
      }
    }
  }
  // Selected
  .ant-fullcalendar-selected-day {
    .ant-fullcalendar-value {
      color: #fff;
    }
    .ant-fullcalendar-date {
      background-color: #ffaa3f;
    }
  }
  .ant-fullcalendar-last-month-cell,
  .ant-fullcalendar-next-month-btn-day {
    .ant-fullcalendar-value {
      color: rgba(0, 0, 0, 0.25) !important;
    }
    .ant-fullcalendar-content {
      .ant-badge-status-text {
        color: rgba(0, 0, 0, 0.25) !important;
      }
    }
    .task-status {
      color: rgba(0, 0, 0, 0.25) !important;
    }
  }
}
.task-status {
  font-size: 24px;
}
.status-done {
  color: #3fc64d;
}
.status-out {
  color: #e70012;
}
.status-processing {
  color: #fff100;
}
.status-list {
  color: #000;
}
.d-flex {
  display: flex;
  justify-content: space-between;
}
.btn-detail {
  text-align: right;
  .btn {
    width: 50px;
    border: none;
    border-radius: 5px;
    color: #fff;
    background-color: gray;
    &:hover {
      cursor: pointer;
    }
  }
}
.event-detail {
  min-width: 160px;
  min-height: 40px;
  background-color: unset;
  color: #ffaa3f;
}
.tool-tip {
  border: 1px solid #ffaa3f;
}

/deep/ {
  // Tooltip
  .ant-tooltip-content {
    min-width: 200px;
    color: #ffaa3f;
    .ant-tooltip-inner {
      color: #ffaa3f !important;
    }
  }
  .ant-tooltip-inner {
    background-color: unset;
  }
  .ant-tooltip-inner {
    color: yellow;
    background-color: green;
    width: 200px;
  }
}
.event-block {
  padding: 20px 0;
}
.event-list {
  padding-top: 20px;
  ul {
    padding-bottom: 20px;
    font-size: 22px;
  }
}

.btn-load-more {
  text-align: center;
  color: #000;
  font-size: 35px;
  &:hover {
    cursor: pointer;
  }
}

.status-light {
  padding: 0 5px;
  height: 50px;
  width: 135px;
  display: flex;
  justify-content: space-between;
  background-color: #dddddd;
  border-radius: 30px;
  margin: auto;
  border: 2px solid #888888;

  .light-general {
    padding: 5px;
    background-color: #888888;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    border: 2px solid #888888;
    margin: auto;
  }
  .light-processing {
    background-color: #fbd103;
  }
  .light-done {
    background-color: #00a54f;
  }
  .light-out {
    background-color: #de1920;
  }
}
</style>
