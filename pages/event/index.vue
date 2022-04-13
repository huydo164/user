<template>
  <div>
    <test-components />
    <a-form-model
      ref="form"
      :model="form"
      :rules="formRules"
      class="form__event"
      @submit.prevent="handleSubmit"
    >
      <a-spin :spinning="loading">
        <div class="container__event">
          <table class="event--table">
            <thead>
              <tr>
                <th class="bg-head">
                  {{ $t("event.start_date") }}
                </th>
                <th class="bg-head">
                  {{ $t("event.big_item") }}
                </th>
                <th class="bg-head">
                  {{ $t("event.medium_item") }}
                </th>
                <th class="bg-head">
                  {{ $t("event.small_item") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <td class="form-input pd-input">
                <a-form-model-item prop="start_date">
                  <a-date-picker
                    v-model="form.start_date"
                    class="event-date"
                    mode="date"
                    format="YYYY-MM-DD"
                    :placeholder="$t('event.start_date')"
                  />
                </a-form-model-item>
              </td>

              <td class="form-input pd-input">
                <a-form-model-item prop="big_item">
                  <a-select
                    v-model="form.big_item"
                    :allow-clear="true"
                    :placeholder="$t('event.big_item')"
                  >
                    <a-select-option v-for="big in bigItem" :key="big.id">
                      {{ big.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </td>

              <td class="form-input pd-input">
                <a-form-model-item prop="medium_item">
                  <a-select
                    v-model="form.medium_item"
                    :allow-clear="true"
                    :placeholder="$t('event.medium_item')"
                  >
                    <a-select-option
                      v-for="medium in parentMediumItem"
                      :key="medium.id"
                    >
                      {{ medium.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </td>

              <td class="form-input pd-input">
                <a-form-model-item prop="small_item">
                  <a-select
                    v-model="form.small_item"
                    :allow-clear="true"
                    :placeholder="$t('event.small_item')"
                  >
                    <a-select-option
                      v-for="small in parentSmallItem"
                      :key="small.id"
                    >
                      {{ small.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </td>
            </tbody>
          </table>
          <div class="btn-update">
            <a-button class="bg-secondary mr-4" html-type="submit" size="large">
              {{ $t("common.confirm") }}
            </a-button>
          </div>
        </div>
        <div class="btn-not-event">
          <a-button class="bg-warning" size="large" @click="goBack">
            {{ $t("event.not_event") }}
          </a-button>
        </div>
      </a-spin>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BIG_ITEM, SMALL_ITEM, MEDIUM_ITEM } from "~/constants/options";
import DownloadFile from "~/mixins/download-file";
import TestComponents from "~/components/templates/TestComponents";
export default {
  mixins: [DownloadFile],

  components: {
    TestComponents,
  },

  data() {
    return {
      form: {
        big_item: undefined,
        medium_item: undefined,
        small_item: undefined,
      },
      parentSmallItem: [],
      parentMediumItem: [],
      resource: "event",
    };
  },

  computed: {
    ...mapState({
      loading: "loading",
    }),

    /**
     * option big item
     *
     * @return {Array}
     */
    bigItem() {
      return BIG_ITEM;
    },

    /**
     * option medium item
     *
     * @return {Array}
     */
    mediumItem() {
      return MEDIUM_ITEM;
    },

    /**
     * option small item
     *
     * @return {Array}
     */
    smallItem() {
      return SMALL_ITEM;
    },

    formRules() {
      return {
        start_date: [
          {
            required: true,
            message: this.$t("validation.required", {
              field: this.$t("event.start_date"),
            }),
            trigger: ["change", "blur"],
          },
        ],
        big_item: [
          {
            required: true,
            message: this.$t("validation.required", {
              field: this.$t("event.big_item"),
            }),
            trigger: "change",
          },
        ],
        medium_item: [
          {
            required: true,
            message: this.$t("validation.required", {
              field: this.$t("event.medium_item"),
            }),
            trigger: "change",
          },
        ],
        small_item: [
          {
            required: true,
            message: this.$t("validation.required", {
              field: this.$t("event.small_item"),
            }),
            trigger: "change",
          },
        ],
      };
    },
  },

  watch: {
    /**
     * watch change value big item
     */
    "form.big_item": {
      handler(item) {
        this.parentMediumItem = item
          ? this.mediumItem.filter((medium) => medium.parent_id === item)
          : [];
        this.form.medium_item = undefined;
      },
      deep: true,
    },

    /**
     * watch change value medium item
     */
    "form.medium_item": {
      handler(item) {
        this.parentSmallItem = item
          ? this.smallItem.filter((small) => small.parent_id === item)
          : [];
        this.form.small_item = undefined;
      },
      deep: true,
    },
  },

  methods: {
    /**
     * call api create event
     */
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$store.dispatch("setLoading", true);

          try {
            const data = {
              start_date: Math.floor(this.form.start_date.valueOf() / 1000),
              category_id: this.form.small_item,
            };

            await this.$api.event.create(data);
            this.$notification.success({
              message: this.$t("text.successfully"),
            });
          } catch (e) {
            this.$notification.error({
              message: this.$t("text.something_wrong"),
            });
          } finally {
            this.$store.dispatch("setLoading", false);
          }
        }
      });
    },

    goBack() {
      this.$router.push({ path: "/" });
    },

    /**
     * dowload file pdf
     */
    async download() {
      try {
        const res = await this.$api.event.downloadPdf();
        this.downloadFile({
          data: res.data,
          type: "application/pdf",
          name: "event.pdf",
        });

        this.$notification.success({
          message: this.$t("text.successfully"),
        });
      } catch (e) {
        this.$notification.error({
          message: this.$t("text.something_wrong"),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form__event {
  padding: 30px 0px;
  /deep/ {
    .event--table {
      width: 100%;
      border: 1px solid #c4c4c4;
      text-align: center;
      .bg-head,
      .pd-input {
        border: 1px solid #c4c4c4;
        width: 25%;
      }
      .bg-head {
        background: $warning-color;
        color: #fff;
        padding: 10px 0px;
        font-size: 16px;
      }
      .pd-input {
        padding: 20px 20px 5px 20px;

        .event-date {
          width: 100%;
        }
      }
    }
    .btn-update {
      text-align: right;
      margin: 30px 0px;
      .bg-secondary {
        background: #6c757d;
        color: #fff;
      }
    }
    .btn-not-event {
      text-align: center;
      .bg-warning {
        color: #fff;
        background: $warning-color;
      }
    }
  }
}
</style>
