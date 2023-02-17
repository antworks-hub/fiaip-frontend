<template>
    <div class="row">
        <div class="col-12 mt-3">
          <h4>Seleziona gli elementi caratteristici:</h4>
            <div v-for="element in elements">
                <base-checkbox v-model="selectedElements" :value="element.id"
                               :name="element.id"
                               @input="selectElement(selectedElements, element)"
                >
                    {{ `${element.number}` }} {{ `${element.description}` }}
                    <span v-if="element.base_flag">(Elemento Base)</span>
                    <span v-if="element.renovation_flag">(Elemento Ristrutturazione)</span>
                </base-checkbox>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
export default {
    props: {
        computation: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            selectedElements: null
        }
    },
    watch: {
        computation: {
            handler(val) {
                if (val && val.elements) {
                    this.selectedElements = val.elements
                }
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        this.fetchElements()
    },
    beforeDestroy() {
        this.clearElements()
    },
    methods: {
        ...mapActions({
            fetchElements: 'elements/fetch',
            clearElements: 'elements/resetItems'
        }),
        validate () {
            return true
        },
        selectElement(selectedElements, element) {
            this.$emit('setElements', selectedElements)
        }
    },
    computed: {
        ...mapGetters({
            elements: 'elements/items'
        })
    }
}
</script>