<template>
  <VCard title="User Profile">
    <VCardText>
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
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
const props = defineProps({
  cardData: Object,
});
</script>
