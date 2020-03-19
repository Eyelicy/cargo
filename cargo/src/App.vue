<template>
  <v-app>
    <v-app-bar
      flat
      :absolute="this.$route.name=='Home'?false:true"
      :fixed="this.$route.name=='Home'?true:false"
      :color="this.$route.name=='Home'?appbarBack:'#fff'"
      class="mx-auto pa-0"
      v-if="$route.meta.showTab"
    >
      <v-sheet
        width="1200"
        height="100%"
        :color="this.$route.name=='Home'?appbarBack:'#fff'"
        class="mx-auto d-flex pa-0 align-center"
      >
        <v-img max-width="200" :src="this.$route.name=='Home'?logo:logoB"></v-img>

        <v-spacer></v-spacer>

        <v-btn
          text
          exact
          exact-active-class="font-weight-bold"
          :color="this.$route.name=='Home'?appbarColor:'#1C7CFF'"
          to="/"
          class="body-1"
        >首页</v-btn>

        <v-btn
          text
          exact
          class="appBarBtn body-1"
          to="/about"
          exact-active-class="font-weight-bold"
          :color="this.$route.name=='Home'?appbarColor:'#1C7CFF'"
        >液货计量</v-btn>

        <v-btn
          text
          exact
          class="appBarBtn body-1"
          exact-active-class="font-weight-bold"
          :color="this.$route.name=='Home'?appbarColor:'#1C7CFF'"
        >散货计重</v-btn>

        <v-btn
          text
          exact
          class="appBarBtn body-1"
          exact-active-class="font-weight-bold"
          :color="this.$route.name=='Home'?appbarColor:'#1C7CFF'"
        >数据查询</v-btn>

        <v-btn
          text
          exact
          class="appBarBtn body-1"
          exact-active-class="font-weight-bold"
          :color="this.$route.name=='Home'?appbarColor:'#1C7CFF'"
          to="/login"
        >个人中心</v-btn>
      </v-sheet>
    </v-app-bar>

    <v-content>
      <router-view />
      <tips></tips>
    </v-content>

    <v-footer padless color="#414141" class="text-center" v-if="$route.meta.showTab" absolute>
      <v-col class="text-center" cols="12">
        <p class="d-inline" style="color:#817F7F;">版权所有</p>
        <p class="d-inline white--text">&nbsp;南京携众信息科技有限公司</p>
        <p class="d-inline" style="color:#817F7F;">&nbsp;@2018-2018</p>
        <p class="d-inline white--text">&nbsp;&nbsp;&nbsp;苏ICP备07023176号-2</p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.appBarBtn {
  color: rgba(255, 255, 255, 0.5);
}

.v-btn:before {
  background-color: transparent !important;
}
</style>


<script>
import tips from "@/components/common/tips";
import logoB from "./assets/logoB.png";
export default {
  name: "App",
  components: { tips },
  data: () => ({
    logoB,
    length: 6,
    banner: 0,
    index: 1,
    appbarBack: "transparent",
    appbarColor: "#fff",
    logo: require("./assets/logoW.png")
  }),
  created() {},
  mounted() {
    window.addEventListener(
      "mousewheel",
      this.debounce(this.handleScroll, 300),
      true
    ) ||
      window.addEventListener(
        "DOMMouseScroll",
        this.debounce(this.handleScroll, 300),
        false
      );
  },
  methods: {
    debounce(func, wait) {
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    handleScroll(e) {
      let direction = e.deltaY > 0 ? "down" : "up";
      let scrollTop = document.documentElement.scrollTop;
      if (direction == "down") {
        if (this.index < 5) {
          this.index++;
        } else {
          this.index = 5;
        }
        this.$vuetify.goTo("#card" + this.index);
      } else {
        if (this.index > 0) {
          this.index--;
        } else {
          this.index = 0;
        }
        this.$vuetify.goTo("#card" + this.index);
      }
      if (this.index == 2 || this.index == 4) {
        this.appbarColor = "#1C7CFF";
        this.appbarBack = "#fff";
        this.logo = require("./assets/logoB.png");
      } else {
        this.appbarColor = "white";
        this.appbarBack = "transparent";
        this.logo = require("./assets/logoW.png");
      }
    }
  }
};
</script>

