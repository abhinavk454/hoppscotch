<template>
  <SmartLink
    :to="`${/^\/(?!\/).*$/.test(to) ? localePath(to) : to}`"
    :exact="exact"
    :blank="blank"
    class="rounded flex-shrink-0 py-2 px-4 transition inline-flex items-center hover:bg-primaryDark hover:text-secondaryDark focus:outline-none focus-visible:bg-primaryDark focus-visible:text-secondaryDark"
    :class="[
      { 'opacity-75 cursor-not-allowed': disabled },
      { 'pointer-events-none': loading },
      { 'flex-1': label },
      { 'flex-row-reverse justify-end': reverse },
      {
        'border border-divider hover:border-dividerDark focus-visible:border-dividerDark':
          outline,
      },
    ]"
    :disabled="disabled"
    :tabindex="loading ? '-1' : '0'"
  >
    <span
      v-if="!loading"
      class="inline-flex items-center"
      :class="{ 'self-start': infoIcon }"
    >
      <i
        v-if="icon"
        :class="[
          label ? (reverse ? 'ml-4 opacity-75' : 'mr-4 opacity-75') : '',
          { 'text-accent': active },
        ]"
        class="material-icons"
      >
        {{ icon }}
      </i>
      <SmartIcon
        v-if="svg"
        :name="svg"
        :class="[
          label ? (reverse ? 'ml-4 opacity-75' : 'mr-4 opacity-75') : '',
          { 'text-accent': active },
        ]"
        class="svg-icons"
      />
    </span>
    <SmartSpinner v-else class="mr-4 text-secondaryDark" />
    <div
      class="flex-1 inline-flex items-start truncate"
      :class="{ 'flex-col': description }"
    >
      <div class="font-semibold truncate">
        {{ label }}
      </div>
      <p
        v-if="description"
        class="font-medium my-2 text-left text-secondaryLight"
      >
        {{ description }}
      </p>
    </div>
    <i
      v-if="infoIcon"
      class="ml-6 items-center self-center material-icons"
      :class="{ 'text-accent': activeInfoIcon }"
    >
      {{ infoIcon }}
    </i>
    <div v-if="shortcut.length" class="ml-2 <sm:hidden">
      <kbd
        v-for="(key, index) in shortcut"
        :key="`key-${index}`"
        class="shortcut-key -mr-2"
      >
        {{ key }}
      </kbd>
    </div>
  </SmartLink>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    to: {
      type: String,
      default: "",
    },
    exact: {
      type: Boolean,
      default: true,
    },
    blank: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    svg: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    shortcut: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Boolean,
      default: false,
    },
    activeInfoIcon: {
      type: Boolean,
      default: false,
    },
    infoIcon: {
      type: String,
      default: "",
    },
  },
})
</script>
