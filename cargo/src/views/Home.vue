<template>
  <div class="home">
    <v-carousel
      id="card1"
      cycle
      hide-delimiter-background
      :show-arrows="false"
      interval="6000"
      :height="bannerHeigth"
    >
      <v-carousel-item
        src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_image_one%402x.png"
      >
        <v-card
          max-width="1200"
          :height="bannerHeigth"
          class="mx-auto px-4 white--text d-flex flex-column justify-center"
          flat
          style="background-color:transparent;"
        >
          <v-img
            class="flex-grow-0"
            width="650"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_headline_one%402x.png"
          ></v-img>
          <v-card-title class="white--text pl-0 pt-8">基于云计算和区块链技术</v-card-title>
          <v-card-title class="white--text pl-0 pt-0">集计量计重、防伪溯源、报告出证、大数据分析等丰富功能于一体</v-card-title>
        </v-card>
      </v-carousel-item>
      <v-carousel-item
        src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_image_two%402x.png"
      >
        <v-card
          max-width="1200"
          :height="bannerHeigth"
          class="mx-auto white--text d-flex flex-column justify-center"
          flat
          style="background-color:transparent;"
        >
          <v-img
            width="785"
            class="flex-grow-0 mx-auto"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_image_two_headline%402x.png"
          ></v-img>
        </v-card>
      </v-carousel-item>
      <v-carousel-item
        src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_image_three%402x.png"
      >
        <v-card
          max-width="1200"
          :height="bannerHeigth"
          class="mx-auto white--text d-flex flex-column justify-center"
          flat
          style="background-color:transparent;"
        >
          <v-img
            width="785"
            class="flex-grow-0 mx-auto"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/banner_image_three_headline%402x.png"
          ></v-img>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-window id="card2" v-model="banner" style="position: relative;background-color:#FAF9FF;">
      <v-window-item v-for="banner in bannerArr" :key="banner.id">
        <v-card
          color="#FAF9FF"
          :height="bannerHeigth"
          width="1200"
          class="mx-auto white--text px-4"
          flat
        >
          <v-row
            justify="space-between"
            align="center"
            align-content="center"
            style="height: 100%;width: 100%;"
          >
            <v-col cols="4" class="text-center">
              <v-row class="flex-column ma-0 fill-height" justify="center">
                <v-col class="px-0">
                  <p
                    class="display-4 text-left font-weight-medium"
                    style="color: #1A80FF;"
                  >{{banner.title}}</p>
                </v-col>
                <v-col class="px-0 black--text text-left">
                  <p>{{banner.p}}</p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8" justify="right" align="right">
              <v-img :width="banner.width" :height="banner.height" :src="banner.src"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-window-item>
      <div
        class="px-2"
        :style="{position: 'absolute',width: '1200px',height:bannerHeigth+'px',top:'61%',left:'0',right:'0',margin:'auto',padding:'0 16px'}"
      >
        <v-item-group v-model="banner" class="text-left">
          <v-item v-for="n in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
            <v-btn small left icon @click="toggle" :color="active?'#1A80FF':'rgba(26,128,255,0.3)'">
              <v-icon small>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </div>
    </v-window>
    <v-card
      id="card3"
      tile
      :height="bannerHeigth"
      class="mx-auto white--text d-flex flex-column justify-center"
      flat
      img="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/characteristic_bg%402x.png"
    >
      <v-img
        class="mx-auto flex-grow-0"
        width="900"
        src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/characteristic_image_icon%402x.png"
      ></v-img>
    </v-card>
    <v-card
      color="#FAF9FF"
      id="card4"
      tile
      :height="bannerHeigth"
      flat
      class="d-flex flex-column justify-center"
    >
      <div class="mb-12" style="width: 773px;margin: 0 auto;">
        <v-img
          width="242"
          class="mx-auto my-12"
          src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/inspection_company%402x.png"
        ></v-img>
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="2">
            <v-img
              width="100"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/free_registration_icon%402x.png"
            ></v-img>
            <!-- <p>免费注册</p> -->
          </v-col>
          <v-col cols="3">
            <v-item v-for="n in length" :key="`btn-${n}`">
              <v-btn icon x-small color="rgba(26,128,255,1)">
                <v-icon x-small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <v-col cols="2">
            <v-img
              width="100"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/platform_audit_icon%402x.png"
            ></v-img>
            <!-- <p>平台审核</p> -->
          </v-col>
          <v-col cols="3">
            <v-item v-for="n in length" :key="`btn-${n}`">
              <v-btn icon x-small color="rgba(26,128,255,1)">
                <v-icon x-small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <v-col cols="2">
            <v-img
              width="100"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/start_using_icon%402x.png"
            ></v-img>
            <!-- <p>开始使用</p> -->
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="text-center headline">
          <v-col cols="2">
            <p style="color:#1A80FF;">免费注册</p>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="2">
            <p style="color:#1A80FF;">平台审核</p>
          </v-col>
          <v-col cols="3"></v-col>
          <v-col cols="2">
            <p style="color:#1A80FF;">开始使用</p>
          </v-col>
        </v-row>
      </div>
      <div style="width:900px;" class="mx-auto mt-12">
        <v-img
          width="211"
          class="mx-auto mb-12"
          src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/shipping_company%402x.png"
        ></v-img>
        <v-row justify="center" align="center" no-gutters class="text-center mb-4">
          <v-col col="auto">
            <v-img
              width="80"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/free_registration_icon%402x.png"
            ></v-img>
          </v-col>
          <v-col col="auto">
            <v-item v-for="n in length" :key="`btn-${n}`">
              <v-btn x-small icon color="rgba(26,128,255,1)">
                <v-icon x-small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <v-col col="auto">
            <v-img
              width="80"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/upload_icon%402x.png"
            ></v-img>
          </v-col>
          <v-col col="auto">
            <v-item v-for="n in length" :key="`btn-${n}`">
              <v-btn x-small icon color="rgba(26,128,255,1)">
                <v-icon x-small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <v-col col="auto">
            <v-img
              width="80"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/platform_audit_icon%402x.png"
            ></v-img>
          </v-col>
          <v-col col="auto">
            <v-item v-for="n in length" :key="`btn-${n}`">
              <v-btn x-small icon color="rgba(26,128,255,1)">
                <v-icon x-small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-col>
          <v-col col="auto">
            <v-img
              width="80"
              style="margin: 0 auto;"
              src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/start_using_icon%402x.png"
            ></v-img>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align="center" class="text-center headline">
          <v-col col="2">
            <p style="color:#1A80FF;">免费注册</p>
          </v-col>
          <v-col col="3"></v-col>
          <v-col col="2">
            <p style="color:#1A80FF;">上传舱容表</p>
          </v-col>
          <v-col col="3"></v-col>
          <v-col col="2">
            <p style="color:#1A80FF;">平台审核</p>
          </v-col>
          <v-col col="3"></v-col>
          <v-col col="2">
            <p style="color:#1A80FF;">开始使用</p>
          </v-col>
        </v-row>
      </div>
      <!-- <div class="mt-12" style="width: 812px;margin: 0 auto;">
                        
      </div>-->
    </v-card>

    <v-card
      id="card5"
      tile
      :height="bannerHeigth"
      class="mx-auto white--text d-flex flex-column justify-center"
      flat
      img="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/business_entrance_bg%402x.png"
    >
      <v-row
        style="max-width: 1034px;width: 1034px;margin: 0 auto;"
        no-gutters
        justify="center"
        align="center"
      >
        <v-col cols="4" align="left">
          <v-img
            class="mb-6"
            width="180"
            height="180"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/liquid _cargo_metering_icon%402x.png"
          ></v-img>
          <v-btn class="subtitle-1" min-width="180" rounded color="#fff">液货计量</v-btn>
        </v-col>
        <v-col cols="4" align="center">
          <v-img
            class="mb-6"
            width="180"
            height="180"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/bulk_weight_icon%402x.png"
          ></v-img>
          <v-btn class="subtitle-1" min-width="180" rounded color="#fff">散货计重</v-btn>
        </v-col>
        <v-col cols="4" align="right">
          <v-img
            class="mb-6"
            width="180"
            height="180"
            src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/data_query_icon%402x.png"
          ></v-img>
          <v-btn class="subtitle-1" min-width="180" rounded color="#fff">数据查询</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
    bannerHeigth: 0,
    banner: 0,
    length: 6,
    autorun: true,
    index: 1,
    bannerArr: [
      {
        id: 0,
        title: "速度快",
        p: "仅需几分钟即可完成计量计重出具报告，大幅提高工作效率!",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/fast_image_one%402x.png",
        width: "709",
        height: "634"
      },
      {
        id: 1,
        title: "结果准",
        p:
          "无需计算！只要输入吃水等观测值即可自动完成工作，精度可达小数点后6位！",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/accurate_two%402x.png",
        width: "645",
        height: "496"
      },
      {
        id: 2,
        title: "数据全",
        p:
          "内置船舶资料，作业数据提供照片存证，提供经验常数（底量）运载能力、亏舱率、装卸效率等全方位大数据分析功能",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/whole_three%402x.png",
        width: "498",
        height: "565"
      },
      {
        id: 3,
        title: "传输易",
        p:
          "自动生成PDF格式计量报告，即可打印输出，也可通过QQ、微信等分享传输！",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/easy_four%402x.png",
        width: "695",
        height: "414"
      },
      {
        id: 4,
        title: "防伪造",
        p: "船舶资料、计量报告和全部作业数据均采用区块链储存，防伪造防篡改！",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/prevention_five%402x.png",
        width: "661",
        height: "475"
      },
      {
        id: 5,
        title: "控成本",
        p:
          "标准化作业流程和强大的计算能力，新手也能迅速具备上岗作业能力，大幅降低人员成本！",
        src:
          "https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/control_six%402x.png",
        width: "739",
        height: "441"
      }
    ]
  }),
  created() {
    this.getHeight();
    setInterval(() => {
      if (!this.autorun) return;
      if (++this.banner >= this.length) this.banner = 0;
    }, 6000);
  },

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
    getHeight() {
      this.bannerHeigth = window.innerHeight;
    }
  }
};
</script>
