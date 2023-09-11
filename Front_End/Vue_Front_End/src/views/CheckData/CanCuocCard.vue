<template>
  <VAlert
    variant="outlined"
    color="secondary"
  >
    Căn cước công dân
  </VAlert><VSwitch
    v-model="toggleSwitch"
    style="margin-top: 20px"
    :label="capitalizedLabel(toggleSwitch)"
  />
</template>

<script setup>
const props = defineProps({
  setCheck: Function,
});

const capitalizedLabel = label => {
  const convertLabelText = label.toString();

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1);
};

var toggleSwitch = ref(true);

watch(toggleSwitch, (newVal, oldVal) => {
  props.setCheck(4, newVal);
});
</script>
