<template>
  <div class="justify-center max-w-[80vw] mt-10">
    <div class="flex flex-col justify-center h-full">
      <section
        class="antialiased bg-gray-100 text-gray-600 min-h-screen px-4 relative"
      >
        <div>
          <Loader v-if="loading" />
        </div>

        <div
          class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200 my-10"
        >
          <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">
              Characters from the Rick & Morty
            </h2>
          </header>
          <TableComponent
            v-bind:table-config="tableConfig"
            v-bind:table-items="characters"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { toast } from 'vue3-toastify'
import TableComponent from '../components/layout/TableComponent.vue'
import 'vue3-toastify/dist/index.css'

import Loader from '../components/layout/Loader.vue'
import GET_CHARACTERS from '../gql-operations/getCharacters'
import { Rick } from '../types/exercise'

export default {
  components: { Loader, TableComponent },
  setup() {
    const { result, error, loading } = useQuery(GET_CHARACTERS)
    const tableConfig = ref([
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
      {
        key: 'status',
        label: 'Status',
      },
      {
        key: 'location',
        label: 'Location',
        options: {
          multiline: true,
          className: 'w-[200px]',
        },
      },
      {
        key: 'created',
        label: 'Created At',
        options: {
          date: true,
        },
      },
    ])
    const characters = computed(() => {
      if (result.value && result.value.characters.results) {
        return result.value.characters.results.map(
          ({ name, created, species, location, status, image }: Rick) => ({
            name,
            created,
            species,
            location: location?.name,
            status,
            image,
          }),
        )
      }
      return {}
    })

    watch(
      () => error.value,

      (newValue, oldValue) => {
        if (newValue) {
          toast.error('An Error Occurred')
        }
      },
    )
    watch(
      // property or expression to watch
      () => characters.value.length,

      // callback function to execute when the watched property changes
      (newLength, oldLength) => {
        if (newLength > 0 && newLength !== oldLength) {
          toast.success('Data fetched successfully')
        }
      },
    )
    return { result, error, loading, characters, tableConfig }
  },
}
</script>

<style scoped></style>
