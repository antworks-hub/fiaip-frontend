<template>
  <div class="row">
    <div class="col-12 mt-3" v-if="locationRates">
      Comune di {{ locationRates.municipality }}<br>
      Indirizzo {{ locationRates.address_street }}
      <span v-if="locationRates.address_street_number"> n. {{ locationRates.address_street_number }}</span>
      <span v-if="locationRates.address_apartment_number"> int. {{ locationRates.address_apartment_number }}</span>
      <span v-if="locationRates.address_stair"> scala {{ locationRates.address_stair }}</span>
      <br>
      Superficie reale: {{ locationRates.real_surface }} mq<br>
      Superficie ricalcolata: {{ locationRates.updated_surface }} mq<br>
      <br>
      Circoscrizione {{ locationRates.district_number }} - {{ locationRates.district_name }}<br>
      Area di appartenenza {{ locationRates.area_code }} - {{ locationRates.area_name }}<br>
      <br>
      Numero totale di elementi caratteristici: {{ locationRates.elements_count }}<br>
      Numero di elementi base: {{ locationRates.elements_base_count }}<br>
      Numero di elementi di ristrutturazione: {{ locationRates.elements_renovation_count }}<br>
      <br>
      Sottofascia {{ locationRates.subzone }} - {{ locationRates.subzone_name }}<br>
      <br>
      Valori dalla tabella degli Accordi Territoriali: min {{ locationRates.original_min_value }} - max {{ locationRates.original_max_value }}<br>
      Valori di sottofascia: min {{ locationRates.updated_min_value }} - max {{ locationRates.updated_max_value }}<br>
      <br>
      Aumenti percentuali:
      <ul>
        <li v-for="item in locationRates.increments_description">
          {{ `${item.description}` }}: {{ `${item.increment_perc}%` }}
        </li>
      </ul>
      Totale aumenti percentuali: {{ locationRates.increment_percent}}%<br>
      <br>
      <br>
      CANONE ANNUO MINIMO: € {{ locationRates.min_yearly_rate }}<br>
      CANONE ANNUO MASSIMO: € {{ locationRates.max_yearly_rate }}<br>
      CANONE ANNUO MINIMO INDEROGABILE: € {{ locationRates.mandatory_min_yearly_rate }}<br>
      CANONE MENSILE MINIMO: € {{ locationRates.min_monthly_rate }}<br>
      CANONE MENSILE MASSIMO: € {{ locationRates.max_monthly_rate }}<br>
      CANONE MENSILE MINIMO INDEROGABILE: € {{ locationRates.mandatory_min_monthly_rate }}<br>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    locationRates: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>