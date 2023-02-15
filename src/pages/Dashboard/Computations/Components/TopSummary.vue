<template>
    <div>
        <div v-if="computation && computation.customer" class="row">
            <div class="col-md-2 mb-2">
                <b>Cliente</b>
            </div>
            <div class="col-md-4 mb-2">
                {{ computation.customer }}
            </div>
            <div v-if="computation.agent" class="col-md-2 mb-2">
                <b>Agente</b>
            </div>
            <div v-if="computation.agent" class="col-md-4 mb-2">
                {{ computation.agent }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        computation: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>