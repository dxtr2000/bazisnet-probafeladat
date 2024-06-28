<template>
  <div>
    <ExchangeTable />
    <ExchangeChart />
  </div>
</template>

<script>
import ExchangeTable from '../components/ExchangeTable.vue'
import ExchangeChart from '../components/ExchangeChart.vue'

export default {
  components: {
    ExchangeTable,
    ExchangeChart
  }
}
</script>
