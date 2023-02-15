<template>
    <div>
        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <FormWizard 
                    v-model="computation"
                    :apiErrors="apiErrors"
                    :is-loading="isLoading"
                    @saveComputation="saveComputation"
                    @cancelComputation="cancelComputation"
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
                name_or_code: null,
                area: null,
                district: null,
                location_range: null,
                street: null,
                street_number: null,
                zip_code: null,
                elements: [],
                actual_street_number: null,
                apartment_number: null,
                stair: null,
                contract_type: null,
                forniture: null,
                constraint: null,
                surface: null
            }
        }
    },
    computed: {
        ...mapGetters({
            locationRates: 'computations/items'
        })
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
                this.wizard.nextTab()
            }).catch((err) => {
                this.isLoading = false
                if (err.response.status === 422) {
                    this.apiErrors = err.response.data.content
                }
            })
        }
    }
}
</script>
