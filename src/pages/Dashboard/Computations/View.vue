<template>
    <div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 card">
                <div class="row">
                    <div class="col-12 pt-4 pb-4 pl-4 pr-4">
                        <div class="card-title">
                            <h3>Visualizza Ordine</h3>
                        </div>
                        <TopSummary :order="order" :is-review-tab="true"></TopSummary>
                        <CartSummary :order="order" :is-review-tab-active="true" :flat-total="flatTotal" :total-quantity="totalQuantity"
                            :total="total" :total-discount="totalDiscount" :total-discounted="totalDiscounted"
                            :discount-percentage="discountPercentage"
                            :shipping-costs="shippingCosts"
                            :total-discounted-with-shipping="totalDiscountedWithShipping" 
                            :total-discounted-with-shipping-and-iva="totalDiscountedWithShippingAndIva" readonly />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TopSummary from './Components/TopSummary.vue'
import { mapActions, mapGetters } from 'vuex';

import ComputationMixin from '@/mixins/ComputationMixin'

export default {
    components: { TopSummary, CartSummary },

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
