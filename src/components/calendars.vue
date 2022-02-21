<template>
  <div class="calendars">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="300">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details" class="black--text"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: ["Meeting", "Holiday", "PTO"],
    startArr: [],
    endArr: [],
    nameArr: [],
    details: "",
    monthday: localStorage.getItem("monthday") || "",
  }),
  mounted() {
    this.$refs.calendar.checkChange();

    this.pid = pubsub.subscribe("judgeTime", (msg, [timeArr, typeNameArr]) => {
      const startArr = [];
      const endArr = [];
      const nameArr = [];
      timeArr.forEach((item, index) => {
        var hhmm = item.split("-");
        var strTime1 = hhmm[0].split(":");
        var strTime2 = hhmm[1].split(":");
        var b = this.selectTimezone();
        var e = this.selectTimezone();
        b.setHours(strTime1[0]);
        b.setMinutes(strTime1[1]);
        e.setHours(strTime2[0]);
        e.setMinutes(strTime2[1]);
        startArr.push(b);
        endArr.push(e);
        nameArr.push(typeNameArr[index]);
      });
      this.startArr = startArr;
      this.endArr = endArr;
      this.nameArr = nameArr;
    });
    this.pid2 = pubsub.subscribe("summary", (msg, value) => {
      let nowTime = new Date();
      let endTime = new Date();
      endTime.setMinutes(nowTime.getMinutes() + 1);
      this.startArr.push(nowTime);
      this.endArr.push(endTime);
      this.nameArr.push("本日总结");
      this.details = value;
    });
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pid);
    pubsub.unsubscribe(this.pid2);
  },
  methods: {
    selectTimezone() {
      var d = new Date();
      //得到1970年一月一日到现在的秒数
      var len = d.getTime();
      //确定时区
      var timezone = -d.getTimezoneOffset() / 60;
      //本地时间与GMT时间的时间偏移差
      var offset = d.getTimezoneOffset() * 60000;
      //得到现在的格林尼治时间
      var utcTime = len + offset;
      return new Date(utcTime + 3600000 * timezone);
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        console.log("event is", event);
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      const events = [];
      for (let i = 0; i < this.nameArr.length; i++) {
        events.push({
          name: this.nameArr[i],
          start: this.startArr[i].getTime(),
          end: this.endArr[i].getTime(),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          details: this.nameArr[i] === "本日总结" ? this.details : "",
        });
      }
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style lang="less">
.calendars {
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 0;
  width: 100%;
  height: 300px;
}
</style>