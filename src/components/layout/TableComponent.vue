<template>
  <div class="table">
    <div class="table__container">
      <table class="table-auto w-full">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th class="p-4 whitespace-nowrap">ID</th>
            <th
              v-for="(column, index) in tableConfig"
              v-bind:key="index"
              class="p-4 whitespace-nowrap"
              v-bind:class="{
                'table__header-item--multiline':
                  column.options && column.options.multiline,
              }"
            >
              <span class="font-semibold text-left">
                {{ column.label }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          <tr v-for="(item, index) in tableItems" v-bind:key="index">
            <td data-name="sn" class="p-4 whitespace-nowrap">
              {{ index + 1 }}
            </td>

            <td
              v-for="(column, configIndex) in tableConfig"
              v-bind:key="`${item[column.key]}-${configIndex}`"
              v-bind:data-name="`${item[column.key]}-${configIndex}`"
              v-bind:class="{
                'w-[200px] text-wrap':
                  column.options && column.options.multiline,
              }"
              class="px-3"
            >
              <div v-if="column.options && column.options.status">
                <span
                  v-if="column.options.status"
                  class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                >
                  Successful
                </span>

                <span
                  v-else
                  class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                >
                  Failed
                </span>
              </div>
              <div v-else-if="column.options && column.options.multiline">
                <span v-bind:class="`p-2 id-${item[column.key]}`">
                  {{ item[column.key] }}
                </span>
              </div>
              <div v-else-if="column.options && column.options.date">
                <span class="p-2">
                  {{ formatDate(item[column.key]) }}
                </span>
              </div>
              <span v-else class="p-2 whitespace-nowrap">
                {{ item[column.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableConfig: {
      type: Array,
      required: false,
    },
    tableItems: {
      type: Array,
      required: false,
    },
  },
  setup() {
    const formatDate = (value) => {
      if (!value) return ''

      return new Date(value).toLocaleDateString()
    }
    return { formatDate }
  },
}
</script>
