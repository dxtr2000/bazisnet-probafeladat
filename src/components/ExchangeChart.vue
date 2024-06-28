<template>
  <div class="exchange-chart">
    <h2>{{ selectedCurrency }} Árfolyamai</h2>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" v-if="chartData" />
    <div v-else>
      <p>Válaszd ki a pénznemet és a dátumot.</p>
    </div>

    <div class="form-group">
      <label for="currencySelect">Pénznem választás:</label>
      <select v-model="selectedCurrency" id="currencySelect" class="form-control">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="fromDate">Dátumtól:</label>
      <input
        type="date"
        id="fromDate"
        v-model="fromDate"
        @change="fetchCurrencyData(selectedCurrency)"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="toDate">Dátumig:</label>
      <input
        type="date"
        id="toDate"
        v-model="toDate"
        @change="fetchCurrencyData(selectedCurrency)"
        class="form-control"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { fetchExchangeRates } from '../api'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      selectedCurrency: 'USD',
      fromDate: '',
      toDate: '',
      chartData: null,
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      },
      currencies: [] // Üres tömb az inicializációhoz
    }
  },
  async created() {
    await this.fetchCurrencies()
    // Alapértelmezett lekérdezés az USD pénznemre és üres dátumtartományra
    await this.fetchCurrencyData(this.selectedCurrency)
  },
  methods: {
    async fetchCurrencies() {
      try {
        const response = await fetchExchangeRates('20240501', '20240529')
        const uniqueCurrenciesSet = new Set(
          response.data.exchangeRates.map((rate) => rate.currency)
        )
        this.currencies = Array.from(uniqueCurrenciesSet)
      } catch (error) {
        console.error('Error fetching currencies:', error)
      }
    },
    async fetchCurrencyData(currency) {
      try {
        const response = await fetchExchangeRates(
          this.fromDate.split('-').join(''),
          this.toDate.split('-').join('')
        )
        const data = response.data.exchangeRates.filter((rate) => rate.currency === currency)
        this.chartData = {
          labels: data.map((entry) => entry.date),
          datasets: [
            {
              label: `${currency} Árfolyam`,
              backgroundColor: '#f87979',
              data: data.map((entry) => entry.buyRate)
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching currency data:', error)
      }
    }
  },
  watch: {
    selectedCurrency(newCurrency) {
      this.fromDate = ''
      this.toDate = ''
      if (newCurrency) {
        this.fetchCurrencyData(newCurrency)
      }
    }
  }
})
</script>

<style scoped>
.exchange-chart {
  margin: 20px;
  font-family: 'Arial', sans-serif;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-control {
  width: 35%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-control:focus {
  outline: none;
  border-color: #66afe9;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

p {
  font-size: 16px;
  color: #777;
}
</style>
