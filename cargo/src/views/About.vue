<template>
  <div class="about" style="background:#FAF9FF;width:100%;height:100%;padding-top:100px;">
    <v-card
      tile
      flat
      style="box-shadow:0px 0px 6px 0px rgba(7,99,215,0.05);"
      color="#fff"
      class="mx-auto"
      max-width="1200"
    >
      <v-card-title>
        <p style="color:#2787FF;">作业列表</p>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="980px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" tile depressed color="#2787FF" dark class="mr-4">
              <v-icon left>mdi-plus</v-icon>新建作业
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pt-0">
              <div
                class="mx-auto text-center"
                style="border-top: 70px solid #2787FF;border-left: 30px solid transparent;border-right: 30px solid transparent;height: 0;width: 270px;"
              >
                <p class="mb-0" style="margin-top:calc(-25%);color:#fff;">新建作业</p>
              </div>
            </v-card-title>
            <v-card-text class="py-0">
              <v-container>
                <v-row class="text-left">
                  <v-col class="py-0" cols="12" sm="6" md="4">
                    <p>船名</p>
                    <v-select
                      :items="shipName"
                      item-text="shipname"
                      item-value="id"
                      label="请选择船名"
                      v-model="shipId"
                      solo
                      color="rgba(39,135,255,0.1);"
                    ></v-select>
                  </v-col>
                  <v-col
                    class="py-0"
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="item in personalitylist"
                    :key="item.id"
                  >
                    <p>{{item.title}}</p>
                    <v-text-field
                      :label="item.title"
                      :placeholder="'请输入'+item.title"
                      solo
                      v-model="field[item.name]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="pb-6">
              <v-btn
                class="ml-12"
                outlined
                @click="dialog = false"
                color="#A4ADB6"
                width="30%"
                height="48"
                style="font-size:22px;"
              >取 消</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="mr-12"
                @click="submitBtn()"
                color="#2787FF"
                width="30%"
                height="48"
                depressed
                style="color:#FFFFFF;font-size:22px;"
              >提 交</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn tile outlined dark color="#A4ADB6" class="mr-4" @click="filterShow=!filterShow">
          <v-icon left>mdi-format-list-bulleted-square</v-icon>筛选
        </v-btn>
        <v-btn tile outlined dark color="#A4ADB6" @click="listShow=!listShow">
          <v-icon left>mdi-cog-outline</v-icon>自定义列
        </v-btn>
        <v-list
          flat
          shaped
          style="position:absolute;right:0;top:80px;z-index:999;"
          v-show="listShow"
        >
          <v-list-item-group v-model="listData" multiple :max="6">
            <template v-for="(item, i) in items">
              <v-list-item :key="`item-${i}`" :value="item.value">
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active" :true-value="item" @click="toggle"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-divider :key="`divider-${i}`"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-title>
      <v-sheet v-show="filterShow">
        <v-container>
          <v-row class="text-left">
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>船名</p>
              <v-select
                :items="shipName"
                item-text="shipname"
                item-value="id"
                placeholder="请选择船名"
                v-model="shipId"
                solo
                color="rgba(39,135,255,0.1);"
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>航次</p>
              <v-text-field label="航次" placeholder="请输入航次" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>货名</p>
              <v-text-field label="货名" placeholder="请输入货名" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>作业地点</p>
              <v-text-field label="作业地点" placeholder="请输入作业地点" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>起运港</p>
              <v-text-field label="起运港" placeholder="请输入起运港" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>目的港</p>
              <v-text-field label="目的港" placeholder="请输入目的港" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>时间段</p>
              <v-text-field label="时间段" placeholder="请输入时间段" solo></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="4" md="3">
              <p>作业状态</p>
              <v-select
                :items="shipName"
                item-text="shipname"
                item-value="id"
                placeholder="请选择作业状态"
                v-model="shipId"
                solo
                color="rgba(39,135,255,0.1);"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <div style="max-height:600px;height:600px;">
        <v-data-table
          :headers="headers"
          :items="jobList"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="mx-4"
          @page-count="pageCount = $event"
          style="border:2px solid rgba(39,135,255,0.3);"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            max-width="500"
            outlined
            v-model="page"
            :length="pageCount"
            :total-visible="10"
          ></v-pagination>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    listShow: false,
    filterShow: false,
    shipId: 0,
    dialog: false,
    page: 1,
    pageCount: 5,
    itemsPerPage: 8,
    jobList: [],
    shipName: [],
    field: {
      voyage: "",
      locationname: "",
      start: "",
      objective: "",
      goodsname: "",
      transport: "",
      number: "",
      thermometer: "",
      dipstick: "",
      agent: ""
    },
    jobStatus: [{}],
    items: [
      { text: "船名", value: "shipname" },
      { text: "航次", value: "personality.voyage" },
      { text: "作业地点", value: "personality.locationname" },
      { text: "运单量", value: "personality.transport" },
      { text: "作业量", value: "weight" },
      { text: "起运港", value: "personality.start" },
      { text: "目的港", value: "personality.objective" },
      { text: "创建时间", value: "time" },
      { text: "操作", value: "action" }
    ],
    listData: [
      "shipname",
      "personality.voyage",
      "personality.locationname",
      "weight",
      "time",
      "action"
    ],
    personalitylist: [],
    headers: [
      {
        text: "船名",
        align: "start",
        sortable: false,
        value: "shipname"
      },
      { text: "航次", value: "personality.voyage" },
      { text: "作业地点", value: "personality.locationname" },
      { text: "作业量", value: "weight" },
      { text: "创建时间", value: "time" },
      { text: "操作", value: "action" }
    ]
  }),
  watch: {
    listData: {
      handler(newVal, oldVal) {
        (this.headers = []), console.log("深度监听", newVal);
        for (let i in this.items) {
          for (let key in newVal) {
            if (this.items[i].value == newVal[key]) {
              console.log(this.items[i].text);
              this.headers.push({
                text: this.items[i].text,
                value: newVal[key]
              });
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.loadWork();
  },
  methods: {
    loadWork() {
      this.$server.Liquid().then(data => {
        for (let key in data.list) {
          this.jobList.push(data.list[key]);
        }
        console.log(this.jobList);
        for (let key in data.shiplist) {
          this.shipName.push(data.shiplist[key]);
        }
        for (let key in data.personalitylist) {
          this.personalitylist.push(data.personalitylist[key]);
        }
      });
    },
    submitBtn() {
      if (this.shipId) {
        this.$server
          .addresult({
            shipid: this.shipId,
            voyage: this.field["voyage"],
            locationname: this.field["locationname"],
            start: this.field["start"],
            objective: this.field["objective"],
            goodsname: this.field["goodsname"],
            transport: this.field["transport"],
            number: this.field["number"],
            thermometer: this.field["thermometer"],
            dipstick: this.field["dipstick"],
            agent: this.field["agent"]
          })
          .then(data => {
            console.log(data);
            if (data.code == 1) {
              this.bus.$emit("tips", {
                show: true,
                title: '新建成功'
              });
              this.dialog = false;
            } else {
              this.bus.$emit("tips", {
                show: true,
                title: data.error
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="less">
.theme--light.v-pagination .v-pagination__item--active {
  color: #1c3249;
}
.v-application .primary {
  background-color: transparent !important;
  border-color: #2787ff !important;
}
.v-pagination__item {
  border: 2px solid rgba(164, 173, 182, 1);
  border-radius: 0 !important;
  box-shadow: none !important;
}

.v-pagination__navigation {
  width: 34px;
  height: 34px;
  border: 2px solid rgba(164, 173, 182, 1);
  border-radius: 0 !important;
  box-shadow: none !important;
}

.theme--light.v-data-table thead tr:last-child th {
  border-bottom: 2px solid rgba(39, 135, 255, 0.3) !important;
}

.theme--light.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  tbody
  tr:not(:last-child)
  th:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

.theme--light.v-data-table tbody tr:nth-child(odd) {
  background: rgba(15, 122, 255, 0.05);
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  background: rgba(39, 135, 255, 0.1);
  box-shadow: none;
}
</style>