<script setup lang="ts">
defineProps<{ name: 'scholar' | 'email' | 'linkedin' | 'orcid' | 'github' }>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <template v-if="name === 'scholar'">
      <path d="M12 2 0 10l5 3.3V9.8L12 5l7 4.8v3.5l5-3.3L12 2Z" />
      <circle cx="12" cy="16" r="6" />
    </template>
    <g
      v-else-if="name === 'email'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </g>
    <template v-else-if="name === 'linkedin'">
      <path
        d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5.5c0-1.5-.6-2-1.5-2S13 12.2 13 13.5V19h-3V9h3v1.3c.6-1 1.6-1.6 2.9-1.6 2.3 0 3.1 1.5 3.1 4.1V19Z"
      />
    </template>
    <g v-else-if="name === 'orcid'" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10.5" />
      <path d="M7 10v7m4-10h2a5 5 0 0 1 0 10h-2V7Z" />
      <circle cx="7" cy="7" r=".8" fill="currentColor" stroke="none" />
    </g>
    <path
      v-else-if="name === 'github'"
      d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z"
    />
  </svg>
</template>
