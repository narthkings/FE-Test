/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/vue'
import { expect, it, describe } from 'vitest'
import TableComponentVue from '../components/layout/TableComponent.vue'

describe('Table Component', () => {
  it('renders with tableConfig and tableItems props', () => {
    // Define sample data for props
    const tableConfig = [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'species',
        label: 'Species',
        options: {
          multiline: true,
          className: 'w-[200px]',
        },
      },
    ]

    const tableItems = [
      {
        name: 'Rick Sanchez',
        species: 'Human',
        created: '2017-11-04T18:48:46.250Z',
        location: {
          name: 'Citadel of Ricks',
        },
        status: 'Alive',
      },
      {
        name: 'Morty Smith',
        species: 'Human',
        created: '2017-11-04T18:50:21.651Z',
        location: {
          name: 'Citadel of Ricks',
        },
        status: 'Alive',
      },
    ]
    const { getByText } = render(TableComponentVue, {
      props: {
        tableConfig,
        tableItems,
      },
    })
    expect(getByText('Species')).toBeTruthy()
  })
})
