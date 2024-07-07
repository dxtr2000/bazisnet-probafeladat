<template>
  <div class="currency-converter">
    <h2>Valuta Váltó</h2>

    <div class="currency-selector">
      <div>
        <label for="fromCurrency">Forrás Pénznem</label>
        <select v-model="fromCurrency" class="currency-select">
          <option v-for="rate in exchangeRates" :key="rate.currency" :value="rate.currency">
            {{ rate.currency }}
          </option>
        </select>
      </div>

      <div>
        <label for="toCurrency">Cél Pénznem</label>
        <select v-model="toCurrency" class="currency-select">
          <option v-for="rate in exchangeRates" :key="rate.currency" :value="rate.currency">
            {{ rate.currency }}
          </option>
        </select>
      </div>
    </div>

    <div class="amount-input">
      <label for="amount">Összeg</label>
      <input type="number" v-model.number="amount" />
    </div>

    <div
      v-if="fromCurrency && toCurrency && amount !== null && amount !== undefined && amount !== ''"
    >
      <h3 class="result">Eredmény: {{ result.toFixed(2) + ' ' + toCurrency }}</h3>
    </div>
  </div>
</template>

<script>
import { fetchExchangeRates } from '../api'

export default {
  data() {
    return {
      exchangeRates: [],
      fromCurrency: '',
      toCurrency: '',
      amount: null,
      result: null
    }
  },
  async created() {
    const response = await fetchExchangeRates('20240529', '20240529')
    this.exchangeRates = response.data.exchangeRates
  },
  watch: {
    fromCurrency(newValue, oldValue) {
      this.handleCurrencyChange(newValue, this.toCurrency)
    },
    toCurrency(newValue, oldValue) {
      this.handleCurrencyChange(this.fromCurrency, newValue)
    },
    amount(newValue, oldValue) {
      if (
        newValue !== null &&
        newValue !== undefined &&
        newValue !== '' &&
        this.fromCurrency &&
        this.toCurrency
      ) {
        this.convert()
      }
    }
  },
  methods: {
    handleCurrencyChange(from, to) {
      if (from && to && this.amount !== null && this.amount !== undefined && this.amount !== '') {
        this.convert()
      }
    },
    convert() {
      const fromRate = this.exchangeRates.find((rate) => rate.currency === this.fromCurrency)
      const toRate = this.exchangeRates.find((rate) => rate.currency === this.toCurrency)
      if (fromRate && toRate) {
        this.result = (this.amount * fromRate.salesRate) / toRate.buyRate
      }
    }
  }
}
</script>

<style scoped>
.currency-converter {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  color: #343a40;
  margin-bottom: 20px;
}

.currency-selector {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.currency-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

.currency-select:focus {
  outline: none;
  border-color: #007bff;
}

.amount-input {
  margin-bottom: 20px;
}

.amount-input label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
}

.amount-input input {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.amount-input input:focus {
  outline: none;
  border-color: #007bff;
}

.result {
  margin-top: 20px;
  font-size: 20px;
  color: #343a40;
  text-align: center;
}
</style>
