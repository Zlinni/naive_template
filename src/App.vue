<template>
  <n-config-provider
    :theme="darkMode ? darkTheme : lightTheme"
    :theme-overrides="darkMode ? darkThemeOverrides : lightThemeOverrides"
  >
    <n-dialog-provider>
      <n-message-provider>
        <div :class="{ dark: darkMode }" class="h-screen">
          <RouterView />
        </div>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NConfigProvider, darkTheme, lightTheme } from "naive-ui";
import { useDarkmode } from "@/store/useDarkmode";
import { lightThemeOverrides, darkThemeOverrides } from "@/config/theme";

const hookDarkmode = useDarkmode();
const { darkMode } = storeToRefs(hookDarkmode);
</script>

<style lang="scss">
body {
  font-family: Source Han Sans CN;
  cursor: default;
}
.n-dialog__icon {
  display: none;
}
.n-dialog__title {
  font-size: bold;
}
</style>
