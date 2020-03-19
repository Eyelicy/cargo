<template>
  <div style="width:100%;height:100%;">
    <v-card
      tile
      flat
      img="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/register_bg%402x.png"
      height="100%"
    >
      <v-row style="height: 100%;" justify="center" align="center">
        <v-col cols="12">
          <v-card class="mx-auto" max-width="600" max-height="900" min-height="850" tile>
            <v-sheet max-width="480" class="mx-auto">
              <v-card-title class="pa-0 title font-weight-regular justify-space-between">
                <v-progress-linear
                  :class="[step>6 ? 'd-none':'']"
                  :style="{'margin-top': (step<3 ? '115px':'63px')}"
                  height="10"
                  :value="step*50"
                  color="#2787FF"
                ></v-progress-linear>
                <span
                  style="font-size: 40px;color: #107AFF;margin-top: 80px;"
                  class="font-weight-medium"
                >{{ currentTitle }}</span>
                <!-- <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step">
                </v-avatar>-->
              </v-card-title>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <v-text-field
                      color="#0F7AFF"
                      prefix="手机号码"
                      :rules="rules.phone"
                      v-model="phone"
                    ></v-text-field>
                    <v-text-field color="#0F7AFF" prefix="验证码" v-model="code">
                      <template v-slot:append>
                        <v-btn
                          width="150"
                          rounded
                          color="#2787FF"
                          class="mb-3"
                          depressed
                          style="color:#fff"
                          @click="exam()"
                        >获取验证码</v-btn>
                      </template>
                    </v-text-field>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <v-text-field color="#0F7AFF" prefix="姓名" v-model="name"></v-text-field>
                    <v-text-field color="#0F7AFF" prefix="登录名" v-model="loginName"></v-text-field>
                    <v-text-field color="#0F7AFF" prefix="密码" v-model="pwd" type="password"></v-text-field>
                    <v-text-field
                      color="#0F7AFF"
                      prefix="确认密码"
                      v-model="confirmPwd"
                      type="password"
                    ></v-text-field>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >恭喜您，注册成功&nbsp;&nbsp;！</p>
                    <v-img
                      width="374"
                      class="mx-auto"
                      src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/login_was_successful_image%402x.png"
                    ></v-img>
                    <p
                      style="font-size:30px;color:#2787FF;font-weight:400;margin-top: 60px;"
                      class="text-center"
                    >
                      <strong style="font-size:40px;font-weight:400;">还差一步&nbsp;&nbsp;</strong>就可使用平台功能
                    </p>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="4">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <v-text-field color="#0F7AFF" prefix="公司名称" v-model="firmName"></v-text-field>
                    <!-- <v-text-field color="#0F7AFF" prefix="公司类型"></v-text-field> -->
                    <div class="d-flex firmtype mb-5 mt-2" style="height:32px;">
                      <p
                        class="mb-0 mr-12"
                        style="min-width:143px;color:#107AFF;font-size:22px;text-align:justify;text-align-last:justify;line-height:32px;"
                      >公司类型</p>
                      <v-radio-group
                        v-model="firmtype"
                        :mandatory="false"
                        row
                        color="#107AFF"
                        class="my-0 py-0"
                        height="32"
                      >
                        <v-radio value="1">
                          <template v-slot:label>
                            <div style="color:#2787FF;">船舶公司</div>
                          </template>
                        </v-radio>
                        <v-radio value="2">
                          <template v-slot:label>
                            <div style="color:#2787FF;">检验公司</div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </div>
                    <v-text-field color="#0F7AFF" prefix="联系人" v-model="name"></v-text-field>
                    <v-text-field color="#0F7AFF" prefix="联系人电话" v-model="phone"></v-text-field>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="5">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >恭喜您</p>
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 50px;"
                      class="text-center"
                    >可以开始使用啦</p>
                    <v-img
                      width="476"
                      class="mx-auto"
                      src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/login_was_successful_image2%402x.png"
                    ></v-img>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="6">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <v-text-field color="#0F7AFF" prefix="社会信用代码" v-model="creditCode"></v-text-field>
                    <div class="d-flex justify-space-between">
                      <p style="font-size: 22px;color:#107AFF;margin-top: 8px;">上传营业执照</p>
                      <div
                        style="width: 71%;height: 140px;"
                        class="d-flex flex-column justify-space-between"
                      >
                        <v-btn
                          width="110"
                          tile
                          depressed
                          color="#2787FF"
                          class="white--text"
                          @click="upImg"
                        >点击上传</v-btn>
                        <input
                          v-show="false"
                          type="file"
                          id="upload"
                          ref="upImg"
                          @change="changeImg"
                          accept=".jpg, .jpeg, .png"
                        />
                        <div class="d-flex">
                          <v-img v-if="imgFile" max-width="80" height="80" :src="imgFile"></v-img>
                          <v-sheet
                            v-if="!imgFile"
                            tile
                            color="#B5B5B5"
                            width="80"
                            height="80"
                            style="margin-right: 25px;"
                          ></v-sheet>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between mt-10">
                      <p style="font-size: 22px;color:#107AFF;margin-top: 8px;">上传舱容表</p>
                      <div
                        style="width: 71%;height: 100px;"
                        class="d-flex flex-column justify-space-between"
                      >
                        <v-btn
                          width="110"
                          tile
                          depressed
                          color="#2787FF"
                          class="white--text"
                          @click="upFile"
                        >点击上传</v-btn>
                        <input
                          v-show="false"
                          type="file"
                          id="upFile"
                          ref="upFile"
                          @change="changeFile($event)"
                          accept=".pdf, .doc, .docx, .xls, .xlsx"
                        />
                        <div class="d-flex">
                          <p style="color: #2787FF;font-size: 16px;">
                            *
                            请上传该公司旗下任意一条船的电子版舱容表
                          </p>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="7">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >审核将在一个工作日内完</p>
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >成请耐心等待！</p>
                    <v-img
                      width="374"
                      class="mx-auto"
                      src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/awaiting_audit_image%402x.png"
                    ></v-img>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="8">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >公司认领成功</p>
                    <p
                      style="font-size:30px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >您已成为某某某某公司管理员</p>
                    <v-img
                      width="374"
                      class="mx-auto"
                      src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/company_claim_successful_image%402x.png"
                    ></v-img>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="9">
                  <v-card-text class="pa-0" style="margin-top: 74px;">
                    <p
                      style="font-size:40px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >公司认领失败</p>
                    <p
                      style="font-size:30px;color:#2787FF;font-weight:400;margin-bottom: 60px;"
                      class="text-center"
                    >请输入审核失败原因</p>
                    <v-img
                      width="374"
                      class="mx-auto"
                      src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/company_claim_failed_image%402x.png"
                    ></v-img>
                  </v-card-text>
                </v-window-item>
              </v-window>

              <v-card-actions>
                <v-btn
                  width="100%"
                  height="50"
                  class="mx-auto headline"
                  style="margin-top: 100px;color: #fff;font-size: 24px;"
                  rounded
                  color="#2787FF"
                  depressed
                  @click="next"
                >{{btnText}}</v-btn>
              </v-card-actions>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog attach color="transparent" tile v-model="dialog" width="700">
      <v-card
        tile
        flat
        img="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/blue_square%402x.png"
        class="mx-auto d-flex flex-column justify-space-between"
        max-width="600"
        min-height="500"
      >
        <v-card-text
          style="color: #1C3249;font-size:20px;padding-top: 40px;line-height:36px;"
        >系统中已存在“{{firmName}}公司”信息，您可以选择“公司认领” 成为该公司管理员，或选择“重新填写”添加一个新的公司</v-card-text>

        <v-card-actions style="margin-bottom: 35px;">
          <v-btn
            class="ml-4"
            color="#2787FF"
            width="240"
            height="50"
            @click="step=6,dialog = false"
            style="color: #fff;font-size:22px;"
          >公司认领</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-4"
            color="#D6D6D6"
            width="240"
            height="50"
            @click="dialog = false"
            style="color: #1E2F46;font-size:22px;"
          >重新填写</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    firmName: "",
    firmtype: "1",
    //社会信用代码
    creditCode: "",
    dialog: false,
    phone: "",
    code: "",
    name: "",
    pwd: "",
    loginName: "",
    confirmPwd: "",
    step: 1,
    bannerHeigth: 0,
    imgFile: "",
    imgUrl: "",
    review_id: "",
    rules: {
      age: [val => val < 10 || `I don't believe you!`],
      phone: [
        val => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val) || "This phone is required"
      ],
      name: [val => (val || "").length > 0 || "This field is required"]
    }
  }),
  methods: {
    next() {
      switch (this.step) {
        case 1:
          let paramObj = {
            code: this.code,
            phone: this.phone
          };
          this.$server.code(paramObj).then(data => {
            console.log(data);
            if (data.code === 1) {
              this.step++;
            }
          });
          break;
        case 2:
          let Obj = {
            code: this.code,
            phone: this.phone,
            username: this.name,
            title: this.loginName,
            pwd: this.pwd,
            pwd1: this.confirmPwd
          };
          this.$server.regist(Obj).then(data => {
            console.log(data);
            if (data.code === 1) {
              this.step++;
            } else {
              this.bus.$emit("tips", {
                show: true,
                title: data.error
              });
            }
          });
          break;
        case 4:
          this.$server
            .check_firm_name({
              name: this.firmName
            })
            .then(data => {
              console.log(data);
              if (data.need_claimed === 1) {
                this.dialog = true;
              } else if (data.code === 1) {
                this.$server
                  .perfect({
                    firmname: this.firmName,
                    phone: this.phone,
                    people: this.name,
                    firmtype: this.firmtype
                  })
                  .then(data => {
                    console.log(data);
                    if (data.code === 1) {
                      this.step++;
                    }
                  });
              }
            });
          break;
        case 5:
          this.$router.push("/");
          // this.dialog = true;
          break;
        case 6:
          var that = this;
          this.$server
            .claimedFirm({
              firmname: this.firmName,
              shehuicode: this.creditCode,
              img: this.imgUrl
            })
            .then(data => {
              console.log(data);
              if (data.code == 1) {
                console.log(that.formData.get("file"));
                that.review_id = data.review_id;
                that.$http
                  .post(
                    "index.php?c=Upload&a=claimed_file&review_id=" +
                      that.review_id,
                    that.formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data"
                      }
                    }
                  )
                  .then(function(res) {
                    console.log(res);
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
                // this.$server
                //   .upClaimedFirm({
                //     review_id: this.review_id,
                //     file:this.formData
                //   })
                //   .then(data => {
                //     console.log(data);
                //     if (data.code == 1) {
                //       this.review_id = data.review_id;
                //     }
                //   });
              }
            });
          break;
        default:
          this.step++;
          break;
      }
    },
    exam: function() {
      let paramObj = {
        phone: this.phone
      };
      this.$server.exam(paramObj).then(data => {
        if (data.code === 1) {
        } else {
          this.bus.$emit("tips", {
            show: true,
            title: data.error
          });
        }
        console.log(data);
      });
    },
    upImg() {
      let uploadbtn = this.$refs.upImg;
      uploadbtn.click();
    },
    upFile() {
      let uploadbtn = this.$refs.upFile;
      uploadbtn.click();
    },
    changeFile(event) {
      var that = this;
      console.log(event);
      that.formData = new FormData();
      // let file = event.target.files;
      that.formData.append("file", event);
      // console.log(that.formData.get("file"));
    },
    changeImg(e) {
      let that = this;
      let file = that.$refs.upImg;
      let fileList = file.files;
      console.log(fileList);
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(fileList[0]);
      reader.onload = function(e) {
        //读取完毕后调用接口
        that.imgFile = e.target.result;
        that.$server
          .upImg({
            image: that.imgFile
          })
          .then(data => {
            if (data.code == 1) {
              that.imgUrl = data.url;
              that.bus.$emit("tips", {
                show: true,
                title: data.content
              });
            }
          });
      };
    }
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "注册";
        case 2:
          return "填写个人信息";
        case 4:
          return "完善公司信息";
        case 6:
          return "公司认领";
      }
    },
    btnText() {
      switch (this.step) {
        case 1:
          return "下一步";
        case 2:
        case 4:
        case 6:
          return "提交";
        case 3:
          return "立即完善";
        case 5:
          return "立即体验";
        case 7:
          return "退出登录";
        case 8:
          return "立即体验";
        case 9:
          return "更改完善公司信息";
      }
    }
  }
};
</script>

<style>
.v-application--is-ltr .v-text-field__prefix {
  display: inline-block;
  min-width: 143px;
  text-align: justify;
  text-align-last: justify;
  font-size: 22px;
}

.theme--light.v-input {
  color: #0f7aff;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #2787ff;
}

.theme--light.v-text-field:not(.v-input--has-state):hover
  > .v-input__control
  > .v-input__slot:before {
  border-color: #2787ff;
}

.v-dialog {
  box-shadow: none !important;
}

.firmtype {
  position: relative;
}

.firmtype:before {
  border-style: solid;
  border-width: thin 0 0 0;
  bottom: -1px;
  content: "";
  left: 0;
  position: absolute;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  border-color: #2787ff;
}
</style>