<template>
  <div class="exchange-table">
    <h2>Aktuális Árfolyamok</h2>
    <table>
      <thead>
        <tr>
          <th>Pénznem</th>
          <th>Vételi Ár</th>
          <th>Eladási Ár</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in exchangeRates" :key="rate.currency">
          <td>{{ rate.currency }}</td>
          <td>{{ rate.buyRate.toFixed(2) }}</td>
          <td>{{ rate.salesRate.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchExchangeRates } from '../api'

export default {
  data() {
    return {
      exchangeRates: []
    }
  },
  async created() {
    const today = new Date()
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '') // Mai dátum (nem működik mert nincs mindig adat a mai napra)
    console.log(formattedDate)
    const response = await fetchExchangeRates('20240529', '20240529', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    })
    var data = [...new Set(response.data.exchangeRates.map((item) => item.currency))].map(
      (currency) => {
        return {
          currency: currency,
          buyRate: response.data.exchangeRates.find((item) => item.currency === currency).buyRate,
          salesRate: response.data.exchangeRates.find((item) => item.currency === currency)
            .salesRate
        }
      }
    )
    this.exchangeRates = data
  }
}
</script>

<style scoped>
.exchange-table {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f9f9f9, #e9ecef);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

td {
  color: #333;
}
</style>
