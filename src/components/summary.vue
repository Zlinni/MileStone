<template>
  <div>
    <div class="text-h4 mt-4">劳逸结合,明日更好</div>
    <v-dialog transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#2a1e96"
          height="70"
          width="180"
          class="mt-5 text-h5"
          v-bind="attrs"
          v-on="on"
        >
          今日总结
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="#2a1e96" dark class="text-h5">今日总结</v-toolbar>
          <v-textarea
            solo
            name="input-7-4"
            auto-grow
            label="提炼知识，总结错误"
            v-model="summaryText"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn text @click="submit">提交</v-btn>
            <v-btn text @click="dialog.value = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  data() {
    return {
      summaryText: "",
    };
  },
  computed: {
    task() {
      return this.$store.state.dataListOptions.typeList.length;
    },
    subject() {
      return localStorage.getItem("kemuLens");
    },
  },
  methods: {
    submit() {
      pubsub.publish("summary", this.summaryText);
    },
  },
  mounted() {
    this.$route.meta.title = ` 今日一共完成了${this.task}个任务`;
    this.$route.meta.subtitle = `学习了${this.subject}个科目的知识`;
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/summary") {
      if (localStorage.getItem("dayEnd") === "end") {
        next();
      } else {
        alert("还未完成今日的任务");
      }
    }
  },
};
</script>

<style>
.alertBox {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>