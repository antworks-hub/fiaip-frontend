const TablesIndex = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Index.vue')

const TablesAreas = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Areas/List.vue')
const TablesAreasNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Areas/New.vue')
const TablesAreasEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Areas/Edit.vue')

const TablesZipcodes = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Zipcodes/List.vue')
const TablesZipcodesNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Zipcodes/New.vue')
const TablesZipcodesEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Zipcodes/Edit.vue')

const TablesDistricts = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Districts/List.vue')
const TablesDistrictsNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Districts/New.vue')
const TablesDistrictsEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Districts/Edit.vue')

const TablesStreetNumbers = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/StreetNumbers/List.vue')
const TablesStreetNumbersNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/StreetNumbers/New.vue')
const TablesStreetNumbersEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/StreetNumbers/Edit.vue')

const TablesElements = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Elements/List.vue')
const TablesElementsNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Elements/New.vue')
const TablesElementsEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Elements/Edit.vue')

const TablesLocationRanges = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/LocationRanges/List.vue')
const TablesLocationRangesNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/LocationRanges/New.vue')
const TablesLocationRangesEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/LocationRanges/Edit.vue')

const TablesStreets = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Streets/List.vue')
const TablesStreetsNew = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Streets/New.vue')
const TablesStreetsEdit = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tables/Streets/Edit.vue')

export default [
    {
        path: '/tabelle',
        name: 'Tabelle',
        meta: { needsAdmin: false },
        components: { default: TablesIndex }
    },

    {
        path: '/tabelle/aree',
        name: 'Elenco Aree',
        meta: { needsAdmin: false },
        components: { default: TablesAreas }
    },
    {
        path: '/tabelle/aree/nuovo',
        name: 'Nuova Area',
        meta: { needsAdmin: false },
        components: { default: TablesAreasNew }
    },
    {
        path: '/tabelle/aree/:id/modifica',
        name: 'Modifica Area',
        meta: { needsAdmin: true },
        components: { default: TablesAreasEdit }
    },

    {
        path: '/tabelle/cap',
        name: 'Elenco Cap',
        meta: { needsAdmin: false },
        components: { default: TablesZipcodes }
    },
    {
        path: '/tabelle/cap/nuovo',
        name: 'Nuova Cap',
        meta: { needsAdmin: false },
        components: { default: TablesZipcodesNew }
    },
    {
        path: '/tabelle/cap/:id/modifica',
        name: 'Modifica Cap',
        meta: { needsAdmin: true },
        components: { default: TablesZipcodesEdit }
    },

    {
        path: '/tabelle/circoscrizioni',
        name: 'Elenco Circoscrizioni',
        meta: { needsAdmin: false },
        components: { default: TablesDistricts }
    },
    {
        path: '/tabelle/circoscrizioni/nuovo',
        name: 'Nuova Circoscrizione',
        meta: { needsAdmin: false },
        components: { default: TablesDistrictsNew }
    },
    {
        path: '/tabelle/circoscrizioni/:id/modifica',
        name: 'Modifica Circoscrizione',
        meta: { needsAdmin: true },
        components: { default: TablesDistrictsEdit }
    },

    {
        path: '/tabelle/civici',
        name: 'Elenco Civici',
        meta: { needsAdmin: false },
        components: { default: TablesStreetNumbers }
    },
    {
        path: '/tabelle/civici/nuovo',
        name: 'Nuovo Civico',
        meta: { needsAdmin: false },
        components: { default: TablesStreetNumbersNew }
    },
    {
        path: '/tabelle/civici/:id/modifica',
        name: 'Modifica Civico',
        meta: { needsAdmin: true },
        components: { default: TablesStreetNumbersEdit }
    },

    {
        path: '/tabelle/elementi',
        name: 'Elenco Elementi',
        meta: { needsAdmin: false },
        components: { default: TablesElements }
    },
    {
        path: '/tabelle/elementi/nuovo',
        name: 'Nuovo Elemento',
        meta: { needsAdmin: false },
        components: { default: TablesElementsNew }
    },
    {
        path: '/tabelle/elementi/:id/modifica',
        name: 'Modifica Elemento',
        meta: { needsAdmin: true },
        components: { default: TablesElementsEdit }
    },

    {
        path: '/tabelle/fasce',
        name: 'Elenco Fasce',
        meta: { needsAdmin: false },
        components: { default: TablesLocationRanges }
    },
    {
        path: '/tabelle/fasce/nuovo',
        name: 'Nuova Fascia',
        meta: { needsAdmin: false },
        components: { default: TablesLocationRangesNew }
    },
    {
        path: '/tabelle/fasce/:id/modifica',
        name: 'Modifica Fascia',
        meta: { needsAdmin: true },
        components: { default: TablesLocationRangesEdit }
    },

    {
        path: '/tabelle/vie',
        name: 'Elenco Vie',
        meta: { needsAdmin: false },
        components: { default: TablesStreets }
    },
    {
        path: '/tabelle/vie/nuovo',
        name: 'Nuova Via',
        meta: { needsAdmin: false },
        components: { default: TablesStreetsNew }
    },
    {
        path: '/tabelle/vie/:id/modifica',
        name: 'Modifica Via',
        meta: { needsAdmin: true },
        components: { default: TablesStreetsEdit }
    },

]
