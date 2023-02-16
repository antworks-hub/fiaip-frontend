<template>
    <div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 card">
                <div class="row">
                    <div class="col-12 pt-4 pb-4 pl-4 pr-4">
                        <div class="card-title">
                            <h3>Visualizza Ordine</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

import ComputationMixin from '@/mixins/ComputationMixin'

export default {

    mixins: [ComputationMixin],

    data() {
        return {
            orderId: null
        }
    },

    computed: {
        ...mapGetters({
            order: 'orders/single'
        })
    },

    created() {
        this.orderId = this.$route.params.id
        this.getOrder(this.orderId)
    },

    beforeDestroy() {
        this.clearOrder()
    },

    methods: {
        ...mapActions({
            getOrder: 'orders/get',
            clearOrder: 'orders/resetSingle',
        })
    }
};
</script>
