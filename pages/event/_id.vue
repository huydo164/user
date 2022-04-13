<template>
  <div class="event__container">
    <a-spin :spinning="loading">
      <div
        v-if="event"
        class="event-item"
      >
        <div class="event-header">
          <div class="start-time">
            {{ formatDate(event.start_date * 1000) }}
          </div>
          <div class="text-center title">
            <a-icon
              style="font-weight: 600"
              type="unordered-list"
            />
            {{ $t('event.title_deadline', { field: '●●' }) }}
          </div>
        </div>
        <a-row
          class="content"
          :gutter="100"
        >
          <a-col :span="12">
            <div class="title">
              {{ $t('event.title_problem', { field: '●●' }) }}
            </div>
            <div class="para-box">
              {{ event.problem }}
            </div>
            <div class="title event-risk">
              <div class="content">
                {{ $t('event.title_risk', { field: '●●' }) }}
              </div>
              <div class="risk-value">
                <div
                  v-for="(risk, id) in RISKS"
                  :key="id"
                  class="risk"
                >
                  <div
                    class="risk-general"
                    :class="risk"
                  >
                    <div
                      v-if="id + 1 === riskId"
                      class="is-risk"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="para-box">
              {{ event.risk }}
            </div>
          </a-col>
          <a-col :span="12">
            <div class="title">
              {{ $t('event.title_solution') }}
            </div>
            <div class="para-box event-solution">
              {{ event.solution }}
            </div>
            <div class="btn-function">
              <font-awesome-icon
                class="btn"
                icon="check-circle"
                @click="finishEvent()"
              />
              <font-awesome-icon
                class="btn"
                icon="file-export"
                @click="exportPDFEvent()"
              />
              <a-popconfirm
                :title="$t('notification.confirm_delete_event')"
                placement="topRight"
                :ok-text="$t('common.yes')"
                :cancel-text="$t('common.no')"
                @confirm="deleteEvent"
              >
                <font-awesome-icon
                  class="btn"
                  icon="trash-alt"
                />
              </a-popconfirm>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DownloadFile from '~/mixins/download-file'

const RISKS = [
  'risk-1',
  'risk-2',
  'risk-3',
  'risk-4',
  'risk-5',
  'risk-6',
  'risk-7'
]

export default {
  mixins: [DownloadFile],

  data() {
    return {
      event: {},
      RISKS,
      riskId: 4
    }
  },

  computed: {
    ...mapState({
      loading: 'loading'
    })
  },

  mounted() {
    this.getEventDetail()
  },

  methods: {
    /**
     * Get event detail
     */
    async getEventDetail() {
      const id = parseInt(this.$route.params.id)
      const { data } = await this.$api.event.show(id)
      this.event = data.data
    },

    /**
     * Format date
     *
     * @param {int} datetime
     */
    formatDate(datetime) {
      return this.$moment(datetime).format('MM/YY (ddd)')
    },

    /**
     * update status event to success
     */
    async finishEvent() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$api.event.updateStatus(this.$route.params.id)

        this.$notification.success({
          message: this.$t('text.successfully')
        })
      } catch (e) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Export to file pdf about current event
     */
    async exportPDFEvent() {
      this.$store.dispatch('setLoading', true)

      try {
        const res = await this.$api.event.downloadPdf(this.$route.params.id)
        console.log('=>>> ~ res', res)
        this.downloadFile({
          data: res.data,
          type: 'application/pdf',
          name: 'event.pdf'
        })

        this.$notification.success({
          message: this.$t('text.successfully')
        })
      } catch (e) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    },

    /**
     * Delete current event
     */
    async deleteEvent() {
      this.$store.dispatch('setLoading', true)

      try {
        await this.$api.event.delete(this.$route.params.id)

        this.$notification.success({
          message: this.$t('text.successfully')
        })
        this.$router.push('/')
      } catch (e) {
        this.$notification.error({
          message: this.$t('text.something_wrong')
        })
      } finally {
        this.$store.dispatch('setLoading', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.event__container {
  padding: 0 20px;

  .event-header {
    color: #000;
    .start-time {
      position: absolute;
      font-size: 18px;
      left: 80px;
      font-weight: 500;
    }
    .title {
      position: relative;
      font-size: 26px;
    }
  }
  .event-risk {
    display: flex;
    justify-content: space-between;
    align-items: bottom;

    .risk-value {
      display: flex;
      align-items: flex-end;
      .risk {
        display: flex;
        float: right;
        padding-top: 5px;

        .risk-general {
          height: 20px;
          width: 40px;
          position: relative;
        }
        .risk-1 {
          background-color: #7d1085;
        }
        .risk-2 {
          background-color: #1e2087;
        }
        .risk-3 {
          background-color: #005bac;
        }
        .risk-4 {
          background-color: #00a73d;
        }
        .risk-5 {
          background-color: #fff100;
        }
        .risk-6 {
          background-color: #f49401;
        }
        .risk-7 {
          background-color: #e70012;
        }
      }
      .is-risk {
        height: 5px;
        width: 100%;
        background-color: #595959;
        position: absolute;
        top: -10px;
      }
    }
  }

  .content {
    font-size: 18px;
    .title {
      font-size: 22px;
      color: #ffaa3f;
      padding: 20px 0 20px 20px;
    }
    .btn-function {
      text-align: right;
      font-size: 35px;
      color: #000;

      .btn {
        margin: 0 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .para-box {
    border: solid 3px #ffaa3f;
    padding: 20px;
    min-height: 250px;
  }
  .event-solution {
    min-height: 500px;
  }
}
</style>
