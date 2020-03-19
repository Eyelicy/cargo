<template>
  <v-sheet color="#F9F9FF" width="100%" height="100%" class="mx-auto">
    <v-card color="#F9F9FF" tile flat width="1400px" height="100%" class="mx-auto">
      <v-row
        no-gutters
        style="width: 100%;height: 100%;"
        justify="center"
        align="center"
        class="mx-auto"
      >
        <v-img
          style="box-shadow:0px 0px 35px 0px rgba(48,108,255,0.08);"
          max-width="670"
          src="https://waddles.oss-cn-shanghai.aliyuncs.com/cargoImage/sign_in_image%402x.png"
        ></v-img>
        <v-sheet
          width="530"
          height="600"
          color="#fff"
          style="box-shadow:0px 0px 35px 0px rgba(48,108,255,0.08);"
        >
          <!-- <p
            style="color:#2787FF;font-size:40px;padding-top: 80px;margin-bottom: 80px;"
            class="text-center"
          >logo</p> -->
          <v-img width="190" class="mx-auto my-12" src="../assets/images/login_logo.png"></v-img>
          <v-sheet width="410" class="mx-auto">
            <v-text-field color="#0F7AFF" prefix="用户名" append-icon="mdi-account" v-model="title"></v-text-field>
            <v-text-field
              color="#0F7AFF"
              prefix="密 码"
              append-icon="mdi-lock"
              v-model="pwd"
              type="password"
            ></v-text-field>
            <v-btn text class="float-right px-0" style="color: rgba(39,135,255,0.6);">忘记密码</v-btn>
            <v-btn
              width="100%"
              height="50"
              color="#2787FF"
              rounded
              style="font-size: 24px;color:#fff;margin-top: 50px;"
              @click="loginBtn"
            >登录</v-btn>

            <v-sheet
              class="text-center d-flex justify-center align-center"
              style="margin-top: 30px;color: #2787FF;font-size: 18px;font-weight:500;line-height:36px;"
            >
              没有账号？
              <v-btn
                height="36px"
                text
                style="color: #2787FF;font-size: 18px;font-weight:500;"
                class="px-0 align-self-center"
                to="/registered"
              >去注册</v-btn>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    title: "",
    pwd: ""
  }),
  methods: {
    loginBtn() {
      let paramObj = {
        title: this.title,
        pwd: this.pwd
      };
      this.$server.login(paramObj).then(data => {
        console.log(data);
        if (data.code === 1009) {
          this.$router.push("/registered");
        } else if (data.code === 1) {
          this.$router.push("/");
        } else {
          this.bus.$emit("tips", {
            show: true,
            title: data.error
          });
        }
      });
    }
  }
};
</script>

<style>
.v-application--is-ltr .v-text-field__prefix {
  display: inline-block;
  width: 143px;
  /* padding-right: 4px; */
  text-align: justify;
  text-align-last: justify;
  font-size: 22px;
}

.theme--light.v-input {
  color: #2787ff;
}

.theme--light.v-icon {
  color: #2787ff;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #2787ff;
}

.theme--light.v-text-field:not(.v-input--has-state):hover
  > .v-input__control
  > .v-input__slot:before {
  border-color: #2787ff;
}
</style>