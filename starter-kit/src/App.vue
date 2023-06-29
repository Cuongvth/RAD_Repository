<script setup>
import { useTheme } from "vuetify";
import ScrollToTop from "@core/components/ScrollToTop.vue";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import { useStore } from "vuex";

const store = useStore();

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig();

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
handleSkinChanges();
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <RouterView />
      <ScrollToTop />
      <VOverlay
        v-model="store.getters.getOverlayVisible"
        persistent
        class="align-center justify-center"
      >
        <VProgressCircular :size="40" color="primary" indeterminate />
      </VOverlay>
      <VSnackbar
        v-model="store.getters.getSnakBar"
        transition="scale-transition"
        location="top end"
      >
        {{ store.getters.getSnakBarContent }}
      </VSnackbar>
    </VApp>
  </VLocaleProvider>
</template>
