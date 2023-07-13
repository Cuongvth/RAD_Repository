<template>
  <VCard title="User Profile">
    <VCardText>
      <VForm @submit.prevent="onSubmit">
        <VRow>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.soCCCD"
              density="compact"
              label="No."
              hint="No."
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[0]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[0], 0, 100),
              ]"
              density="compact"
              label="No."
              hint="No."
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.hoTen"
              density="compact"
              label="Full name"
              hint="Full name"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[1]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[1], 0, 100),
              ]"
              density="compact"
              label="Full name"
              hint="Full name"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.ngayThangNamSinh"
              density="compact"
              label="Date of birth"
              hint="Date of birth"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[2]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[2], 0, 100),
              ]"
              density="compact"
              label="Date of birth"
              hint="Date of birth"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.gioiTinh"
              density="compact"
              label="Sex"
              hint="Sex"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[3]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[3], 0, 100),
              ]"
              density="compact"
              label="Sex"
              hint="Sex"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.quocTich"
              density="compact"
              label="Nationality"
              hint="Nationality"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[4]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[4], 0, 100),
              ]"
              density="compact"
              label="Nationality"
              hint="Nationality"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.coGiaTriDen"
              density="compact"
              label="Date of expiry"
              hint="Date of expiry"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[5]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[5], 0, 100),
              ]"
              density="compact"
              label="Date of expiry"
              hint="Date of expiry"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.noiThuongTru"
              density="compact"
              label="Place of residence"
              hint="Place of residence"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[6]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[6], 0, 100),
              ]"
              density="compact"
              label="Place of residence"
              hint="Place of residence"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.queQuan"
              density="compact"
              label="Place of onigin"
              hint="Place of onigin"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[7]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[7], 0, 100),
              ]"
              density="compact"
              label="Place of onigin"
              hint="Place of onigin"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.dacDiemNhanDang"
              density="compact"
              label="Personal identitication"
              hint="Personal identitication"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[8]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[8], 0, 100),
              ]"
              density="compact"
              label="Personal identitication"
              hint="Personal identitication"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <AppTextField
              readonly
              :value="props.cardData.ngayDangKy"
              density="compact"
              label="Date supply"
              hint="Date supply"
              variant="outlined"
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[9]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[9], 0, 100),
              ]"
              density="compact"
              label="Date supply"
              hint="Date supply"
              variant="outlined"
            />
          </VCol>
          <VCol cols="9">
            <VTextarea
              readonly
              :value="props.cardData.vnm"
              density="compact"
              label="VNM"
              hint="VNM"
              variant="outlined"
              rows="3"
              no-resize
            />
          </VCol>
          <VCol cols="3">
            <AppTextField
              v-model="checkTruong[10]"
              :rules="[
                requiredValidator,
                betweenValidator(checkTruong[10], 0, 100),
              ]"
              density="compact"
              label="VNM"
              hint="VNM"
              variant="outlined"
            />
          </VCol>
          <VCol cols="12">
            <VBtn type="submit">
              Save
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup>
const props = defineProps({
  cardData: Object,
  setCheck: Function,
});

import { betweenValidator, requiredValidator } from "@validators";
import { useStore } from "vuex";

var checkTruong = ref([
  props.cardData.isSoCCCD,
  props.cardData.isHoTen,
  props.cardData.isNgayThangNamSinh,
  props.cardData.isGioiTinh,
  props.cardData.isQuocTich,
  props.cardData.isCoGiaTriDen,
  props.cardData.isNoiThuongTru,
  props.cardData.isQueQuan,
  props.cardData.isDacDiemNhanDang,
  props.cardData.isNgayDangKy,
  props.cardData.isVNM,
]);
const store = useStore();

function valid(value) {
  const regex = /^([0-9]|[1-9][0-9]|100)$/;

  return regex.test(value);
}

function onSubmit() {
  var ok = true;

  checkTruong.value.forEach(element => {
    if (!valid(element)) {
      ok = false;
    }
  });

  if (!ok) {
    store.commit("setSnackBarContent", "Thất bại");

    return;
  }
  props.setCheck(3, Array.from(checkTruong.value));
  store.commit("setSnackBarContent", "Lưu thành công");
}
</script>
