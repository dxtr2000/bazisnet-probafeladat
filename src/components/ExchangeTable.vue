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
          <td>{{ rate.buyRate }}</td>
          <td>{{ rate.salesRate }}</td>
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
    this.exchangeRates = response.data.exchangeRates
  }
}
</script>

<style scoped>
.exchange-table {
  margin: 20px;
  font-family: 'Arial', sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}
</style>
