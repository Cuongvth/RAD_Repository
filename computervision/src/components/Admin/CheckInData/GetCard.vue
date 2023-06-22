<template>
  <div>
    <v-row>
      <v-col cols="6">
        <img
          :src="`data:image/jpeg;base64, ` + dataImage[0]"
          alt=""
          style="height: 400px; width: 300px"
          v-if="dataImage[0].length > 0"
        />
      </v-col>
      <v-col cols="6">
        <img
          :src="`data:image/jpeg;base64, ` + dataImage[1]"
          alt=""
          style="height: 400px; width: 300px"
          v-if="dataImage[1].length > 0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn
          color="#4d96ff"
          style="height: 35px; width: 104px; font-size: 14px; font-weight: 400"
          @click="$refs.fileInput0.click()"
        >
          Mặt trước</v-btn
        >
        <v-file-input
          ref="fileInput0"
          v-model="selectFile[0]"
          accept="image/*"
          @change="onFileSelect(0)"
          outlined
          dense
          hide-details
          style="display: none"
        ></v-file-input>
      </v-col>
      <v-col cols="6">
        <v-btn
          color="#4d96ff"
          style="height: 35px; width: 104px; font-size: 14px; font-weight: 400"
          @click="$refs.fileInput1.click()"
        >
          Mặt sau</v-btn
        >
        <v-file-input
          ref="fileInput1"
          v-model="selectFile[1]"
          accept="image/*"
          @change="onFileSelect(1)"
          outlined
          dense
          hide-details
          style="display: none"
        ></v-file-input>
      </v-col>
    </v-row>
    <br />
    <v-btn
      color="#4d96ff"
      style="
        height: 35px;
        width: 104px;
        font-size: 14px;
        font-weight: 400;
        margin: 20px 0 0 0;
      "
      @click="submit()"
    >
      Kiểm tra</v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectFile: [null, null],
      dataImage: ["", ""],
    };
  },
  methods: {
    async submit() {
      this.btnLoading = true;
      if (this.selectFile[0] == null || this.selectFile[1] == null) {
        this.$store.commit(
          "setSnackBarContent",
          "Không được để trống hình ảnh!"
        );
        this.btnLoading = false;
        return;
      }
      const formData = new FormData();
      formData.append(
        "matTruoc",
        this.selectFile[0] ? this.selectFile[0][0] : null
      );
      formData.append(
        "matSau",
        this.selectFile[1] ? this.selectFile[1][0] : null
      );
      this.getData(formData);
      this.btnLoading = false;
    },
    onFileSelect(index) {
      if (
        this.selectFile[index][0].type == "image/png" ||
        this.selectFile[index][0].type == "image/jpeg" ||
        this.selectFile[index][0].type == "image/jpg"
      ) {
        if (this.selectFile[index][0].size > 2048576) {
          this.$store.commit(
            "setSnackBarContent",
            "File quá nặng chỉ hỗ trợ file dung lượng < 1MB"
          );
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.dataImage[index] = reader.result.split(",")[1];
        };
        reader.readAsDataURL(this.selectFile[index][0]);
      } else {
        this.$store.commit(
          "setSnackBarContent",
          "Vui lòng chọn đúng file định dạng ảnh! Các định dạng được hỗ trợ: JPG, JPEG, PNG"
        );
        return;
      }
    },
  },
  props: { getData: Function },
};
</script>

<style lang="scss" scoped></style>
