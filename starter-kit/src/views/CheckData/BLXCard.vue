<template>
  <VAlert variant="outlined" color="secondary">Giấy phép lái xe </VAlert
  ><VSwitch
    style="margin-top: 20px"
    v-model="toggleSwitch"
    :label="capitalizedLabel(toggleSwitch)"
  />
</template>

<script setup>
const props = defineProps({
  setCheck: Function,
});

const capitalizedLabel = (label) => {
  const convertLabelText = label.toString();

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1);
};

var toggleSwitch = ref(true);

watch(toggleSwitch, (newVal, oldVal) => {
  props.setCheck(4, newVal);
});
</script>
