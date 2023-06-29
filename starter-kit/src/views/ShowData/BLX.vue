<template>
  <VCard title="User Profile">
    <VCardText>
      <VRow>
        <VCol cols="9">
          <AppTextField
            readonly
            :value="props.cardData.so"
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
            :value="props.cardData.ngaySinh"
            density="compact"
            label="Date of birth"
            hint="Date of birth"
            variant="outlined"
          />
        </VCol>
        <VCol cols="9">
          <AppTextField
            readonly
            :value="props.cardData.noiCuTru"
            density="compact"
            label="Address"
            hint="Address"
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
            :value="props.cardData.hang"
            density="compact"
            label="Class"
            hint="Class"
            variant="outlined"
          />
        </VCol>
        <VCol cols="9">
          <AppTextField
            readonly
            :value="props.cardData.moTaXeDuocSuDung"
            density="compact"
            label="Vehicles are allowed to use"
            hint="Vehicles are allowed to use"
            variant="outlined"
          />
        </VCol>
        <VCol cols="9">
          <AppTextField
            readonly
            :value="props.cardData.ngayTrungTuyen"
            density="compact"
            label="Admission date"
            hint="Admission date"
            variant="outlined"
          />
        </VCol>
        <VCol cols="9">
          <AppTextField
            readonly
            :value="props.cardData.ngayDangKy"
            density="compact"
            label="Registration date"
            hint="Registration date"
            variant="outlined"
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
