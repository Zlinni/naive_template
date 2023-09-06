<template>
  <n-config-provider
    :theme="darkMode ? darkTheme : lightTheme"
    :theme-overrides="darkMode ? darkThemeOverrides : lightThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-dialog-provider>
      <n-message-provider>
        <div :class="{ dark: darkMode }" class="h-screen">
          <slot />
        </div>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  darkTheme,
  lightTheme,
  zhCN,
  dateZhCN,
} from "naive-ui";
import { useDarkmode } from "@/store/useDarkmode";
import { lightThemeOverrides, darkThemeOverrides } from "@/config";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("json", json);
const hookDarkmode = useDarkmode();
const { darkMode } = storeToRefs(hookDarkmode);
</script>

<style lang="scss">
// 默认不要dialog 的 icon
.n-dialog__icon {
  display: none;
}
.n-dialog__title {
  font-size: bold;
}
.n-base-select-menu {
  overflow: hidden;
}
.n-message--success-type {
  border: 1px solid #34c724;
}
.n-message--error-type {
  border: 1px solid #f6736f;
}
</style>
