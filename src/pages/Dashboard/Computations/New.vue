<template>
    <div>
        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <FormWizard
                    ref="wizard"
                    v-model="computation"
                    :apiErrors="apiErrors"
                    :is-loading="isLoading"
                    @saveComputation="saveComputation"
                    @cancelComputation="cancelComputation"
                    @downloadComputationPdf="downloadComputationPdf"
                    @clearErrors="apiErrors = {}"
                />
            </div>
        </div>
    </div>
</template>
<script>
import FormWizard from './FormWizard.vue'
import { mapActions, mapGetters } from 'vuex'
import ComputationWizardMixin from '@/mixins/ComputationWizardMixin'
import ComputationMixin from '@/mixins/ComputationMixin'
import axios from 'axios'

import swal from 'sweetalert2'

export default {
    mixins: [ComputationWizardMixin, ComputationMixin],

    components: { FormWizard },

    data() {
        return {
            isLoading: false,
            apiErrors: {},
            computation: {
                id: null,
                user: null,
                name_or_code: 'giorgio',
                area: 4,
                district: 23,
                location_range: 73,
                street: 3832,
                street_number: 6704,
                zip_code: null,
                elements: [1, 2, 3],
                actual_street_number: '29',
                apartment_number: '5',
                stair: null,
                contract_type: 5,
                forniture: 3,
                constraint: 3,
                surface: 150
            }
        }
    },
    computed: {
    },
    methods: {
        ...mapActions({
            createComputation: 'computations/create',
            clearComputation: 'computations/resetSingle',
            calculateLocationRates: 'computations/calculate',
            updateValue: 'computations/updateValue'
        }),
        cancelComputation() {
            swal.fire({
                title: 'Sei sicuro di voler annullare il calcolo?',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-success btn-fill',
                    cancelButton: 'btn btn-danger btn-fill'
                },
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                buttonsStyling: false
            }).then((result) => {
                if (result.value) {
                    this.$router.push('/computations')
                }
            })
        },
        saveComputation() {
            this.isLoading = true
            this.createComputation({ payload: this.flatComputation }).then((res) => {
                this.computation.id = res.data.content.id
                this.calculateLocationRates(this.computation.id)
                this.isLoading = false
                //this.$router.push('/computations')
                this.$refs.wizard.$refs.wizard.nextTab()
            }).catch((err) => {
                this.isLoading = false
                console.log(err)
                if (err.response.status === 422) {
                    this.apiErrors = err.response.data.content
                }
            })
        },
        downloadComputationPdf(computation) {
          let filename = 'Scheda_canone.pdf'
          if(!this.isDownloading) {
            this.isDownloading = true;
            axios({
              url: '/computations/' + computation.id + '/download',
              method: 'GET',
              responseType: 'blob',
            }).then((response) => {
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(new Blob([response.data]))
              link.setAttribute('download', filename);
              link.click()
              this.isDownloading = false
            });
          }
        }
    }
}
</script>
