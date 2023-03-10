<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
            title="GESTIONE TABELLE"
            :loading="isLoading"
            :showBack="false"
        />
        <div class="row">
          <div class="col-12">
            <ul>
              <li><router-link to="/tabelle/aree">Aree</router-link></li>
              <li><router-link to="/tabelle/cap">Cap</router-link></li>
              <li><router-link to="/tabelle/circoscrizioni">Circoscrizioni</router-link></li>
              <li><router-link to="/tabelle/civici">Civici</router-link></li>
              <li><router-link to="/tabelle/elementi">Elementi</router-link></li>
              <li><router-link to="/tabelle/fasce">Fasce min-max</router-link></li>
              <li><router-link to="/tabelle/vie">Vie</router-link></li>
            </ul>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>
  ul{
    list-style: none;
  }
</style>
