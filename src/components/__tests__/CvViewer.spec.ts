import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import CvViewer from '../CvViewer.vue'

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
enableAutoUnmount(afterEach)
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  if (originalShowModal) {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal)
  } else {
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  }
})

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    },
  })
  vi.stubGlobal(
    'URL',
    class extends URL {
      static createObjectURL = vi.fn(() => 'blob:current-cv')
      static revokeObjectURL = vi.fn()
    },
  )
})

describe('CV viewer', () => {
  it('fetches the main-branch PDF on opening and releases it on closing', async () => {
    const fetchCv = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () => new TextEncoder().encode('%PDF-1.7\n').buffer,
    })
    vi.stubGlobal('fetch', fetchCv)
    const wrapper = mount(CvViewer)
    expect(fetchCv).not.toHaveBeenCalled()
    await wrapper.vm.open()
    expect(fetchCv).toHaveBeenCalledWith(
      expect.stringMatching(
        /^https:\/\/raw.githubusercontent.com\/hkbelagali\/cv\/main\/HrishikeshBelagali_cv.pdf\?view=\d+$/,
      ),
      expect.objectContaining({ cache: 'no-store', signal: expect.any(AbortSignal) }),
    )
    expect(wrapper.find('iframe').attributes('src')).toBe('blob:current-cv')
    expect(URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'application/pdf' }),
    )
    await wrapper.find('dialog').trigger('close')
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:current-cv')
    expect(wrapper.find('iframe').exists()).toBe(false)
  })

  it.each([
    ['a network failure', () => Promise.reject(new Error('offline'))],
    [
      'an invalid PDF',
      () =>
        Promise.resolve({
          ok: true,
          arrayBuffer: async () => new TextEncoder().encode('<html>').buffer,
        }),
    ],
  ])('provides a GitHub fallback after %s', async (_, response) => {
    vi.stubGlobal('fetch', vi.fn(response))
    const wrapper = mount(CvViewer)
    await wrapper.vm.open()
    await flushPromises()
    expect(wrapper.find('[role="alert"]').text()).toContain('could not be loaded')
    expect(wrapper.find('iframe').exists()).toBe(false)
    expect(wrapper.find('[role="alert"] a').attributes('href')).toBe(
      'https://github.com/hkbelagali/cv/blob/main/HrishikeshBelagali_cv.pdf',
    )
  })
})
