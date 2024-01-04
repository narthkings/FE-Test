/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import LayoutMainVue from '../components/layout/LayoutMain.vue'

describe('Layout', () => {
  it('Render nav link with Home text', () => {
    render(LayoutMainVue)
    const routerHomeLink = screen.getByText('Home')
    expect(routerHomeLink).toBeTruthy()
  })
  it('Render nav link with rick and morty text', async () => {
    render(LayoutMainVue)
    const routerLink = await screen.findAllByText('Rick & Morty')
    expect(routerLink).toBeTruthy()
  })
})
