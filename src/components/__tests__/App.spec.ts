import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('Academic website', () => {
  it('provides working anchors for every navigation item', () => {
    const wrapper = mount(App)
    const links = wrapper.findAll('nav a')
    expect(links.length).toBeGreaterThan(1)
    for (const link of links) {
      const target = link.attributes('href')!
      expect(target.startsWith('#')).toBe(true)
      expect(wrapper.find(target).exists()).toBe(true)
    }
  })

  it('keeps the research video and provides the CV viewer', () => {
    const wrapper = mount(App)
    expect(wrapper.find('#research video source').attributes('src')).toContain('movie.mp4')
    expect(wrapper.find('#research video').attributes()).toHaveProperty('controls')
    expect(wrapper.find('#about button.text-link').text()).toBe('View CV')
    expect(wrapper.find('dialog[aria-labelledby="cv-title"]').exists()).toBe(true)
    expect(wrapper.find('a[href="mailto:belagal1@msu.edu"]').exists()).toBe(true)
  })

  it('shows the build commit date as a machine-readable date', () => {
    const wrapper = mount(App)
    const date = import.meta.env.VITE_LAST_COMMIT_DATE
    if (date) {
      expect(wrapper.find('header time').attributes('datetime')).toBe(date)
      expect(wrapper.find('header').text()).toContain('Last updated')
    } else {
      expect(wrapper.find('header time').exists()).toBe(false)
      expect(wrapper.find('header').text()).toContain('date unavailable')
    }
  })
})
