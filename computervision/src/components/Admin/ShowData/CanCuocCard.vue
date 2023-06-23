<template>
  <v-alert>Căn cước công dân</v-alert>
  <v-switch v-model="checkType"></v-switch>
</template>

<script>
export default {
  name: "BLXCard",
  data() {
    return { tab: null, checkType: true };
  },
  props: {},
};
</script>

<style lang="css" scoped></style>
