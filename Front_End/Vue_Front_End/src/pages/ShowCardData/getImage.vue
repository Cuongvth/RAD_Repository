<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <VImg
          v-if="props.matTruoc.length > 0"
          :src="`data:image/jpeg;base64, ` + props.matTruoc"
          :style="`transform: rotate(${rotater1.deg}deg); height: 400px; width: 300px`"
          @click="rotater(1)"
        />
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VImg
          v-if="props.matSau.length > 0"
          :src="`data:image/jpeg;base64, ` + props.matSau"
          :style="`transform: rotate(${rotater2.deg}deg); height: 400px; width: 300px`"
          @click="rotater(2)"
        />
      </VCol>
    </VRow>
    <br>
    <VBtn @click="submit">
      <VIcon
        icon="tabler-scan"
        size="20"
      />Nhận dạng
    </VBtn>
  </div>
</template>

<script setup>
const props = defineProps({
  getData: Function,
  matTruoc: String,
  matSau: String,
});

var rotater1 = ref({ deg: 0 });
var rotater2 = ref({ deg: 0 });

function submit() {
  props.getData();
}

function rotater(index) {
  if (index == 1) {
    rotater1.value.deg += 90;
  } else if (index == 2) {
    rotater2.value.deg += 90;
  }
}
</script>
