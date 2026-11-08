<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const sourceUrl = 'https://raw.githubusercontent.com/hkbelagali/cv/main/HrishikeshBelagali_cv.pdf'
const repositoryUrl = 'https://github.com/hkbelagali/cv/blob/main/HrishikeshBelagali_cv.pdf'
const dialog = ref<HTMLDialogElement | null>(null)
const pdfUrl = ref('')
const loading = ref(false)
const error = ref('')
let request: AbortController | null = null

function reset() {
  request?.abort()
  request = null
  if (pdfUrl.value) URL.revokeObjectURL(pdfUrl.value)
  pdfUrl.value = ''
  loading.value = false
  error.value = ''
}

async function open() {
  reset()
  dialog.value?.showModal()
  loading.value = true
  const controller = new AbortController()
  request = controller
  try {
    // Fetch on each opening, bypassing the cached main-branch URL.
    const response = await fetch(`${sourceUrl}?view=${Date.now()}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
    if (!response.ok) throw new Error('CV request failed')
    const bytes = await response.arrayBuffer()
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
      throw new Error('CV response is not a PDF')
    }
    if (controller.signal.aborted) return
    // GitHub serves raw PDFs as octet-stream with framing blocked. A local
    // application/pdf blob lets the browser's PDF viewer display the document.
    pdfUrl.value = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
  } catch {
    if (!controller.signal.aborted)
      error.value = 'The CV could not be loaded. Please try again or view it on GitHub.'
  } finally {
    if (request === controller) loading.value = false
  }
}

defineExpose({ open })
onBeforeUnmount(reset)
</script>

<template>
  <dialog ref="dialog" class="cv-dialog" aria-labelledby="cv-title" @close="reset">
    <div class="cv-toolbar">
      <h2 id="cv-title">Curriculum vitae</h2>
      <div class="cv-actions">
        <a :href="pdfUrl || repositoryUrl" target="_blank" rel="noopener noreferrer"
          >Open in new tab ↗</a
        >
        <button class="cv-close" type="button" @click="dialog?.close()" autofocus>Close ×</button>
      </div>
    </div>
    <p v-if="loading" class="cv-message" role="status">Loading CV…</p>
    <div v-else-if="error" class="cv-message" role="alert">
      <p>{{ error }}</p>
      <button class="text-link" type="button" @click="open">Try again</button>
      <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer">View CV on GitHub ↗</a>
    </div>
    <iframe
      v-if="pdfUrl"
      :src="pdfUrl"
      title="Hrishikesh Belagali's curriculum vitae"
      class="cv-frame"
    ></iframe>
  </dialog>
</template>

<style scoped>
.cv-dialog {
  width: min(1100px, calc(100% - 2rem));
  max-width: none;
  height: 90dvh;
  max-height: calc(100dvh - 2rem);
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: #161616;
  background: #fff;
}
.cv-dialog::backdrop {
  background: rgb(0 0 0 / 65%);
}
.cv-dialog[open] {
  display: flex;
  flex-direction: column;
}
.cv-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.cv-toolbar h2 {
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}
.cv-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.85rem;
}
.cv-close {
  font: inherit;
  color: inherit;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
.cv-close:hover {
  background: #eee;
}
.cv-message {
  padding: 2rem;
}
.cv-message a,
.cv-message button {
  display: inline-block;
  margin-top: 1rem;
  margin-right: 1.25rem;
}
.cv-frame {
  display: block;
  flex: 1;
  min-height: 0;
  width: 100%;
  border: 0;
}
</style>
