<template>
  <div>
    <div class="row d-flex justify-content-center">
        <div class="col-12 card">
            <div class="row">
                <div class="col-12 pt-4 pb-4 pl-4 pr-4">
                    <div class="card-title pull-left">
                        <h3>Visualizza Calcolo</h3>
                    </div>
                    <div class="pull-right">
                      <base-button v-if="computation_id" type="primary" wide class="btn-next" @click.native="downloadComputationPdf({ id: computation_id})">
                        Scarica PDF
                      </base-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 pt-4 pb-4 pl-4 pr-4">
                <ViewLocationRates v-if="locationRates !== undefined" :locationRates="locationRates" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import ComputationMixin from '@/mixins/ComputationMixin'
import ViewLocationRates from './Components/ViewLocationRates.vue'

export default {
    mixins: [ComputationMixin],
    components: {
      ViewLocationRates
    },
    data() {
        return {
            computation_id: null,
            locationRates: null
        }
    },
    computed: {
        ...mapGetters({
            computations: 'computations/single',
        })
    },
    created() {
        this.computation_id = this.$route.params.id
        this.calculateLocationRates(this.computation_id).then(() =>{
          this.locationRates = this.$store.state.computations.singlePayload
        })
    },
    beforeDestroy() {
        this.clearComputation()
    },
    methods: {
        ...mapActions({
            getComputation: 'computations/get',
            calculateLocationRates: 'computations/calculate',
            clearComputation: 'computations/resetSingle',
        })
    }
};
</script>
