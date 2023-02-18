import axios from 'axios'

export default {
    data() {
        return {
        }
    },
    computed: {
        flatComputation() {
            return {
                user_id: this.computation.user ? this.computation.user.id : null,
                name_or_code: this.computation.name_or_code ? this.computation.name_or_code : null,
                area_id: this.computation.area ? this.computation.area.id : null,
                district_id: this.computation.district ? this.computation.district.id : null,
                location_range_id: this.computation.location_range ? this.computation.location_range.id : null,
                street_id: this.computation.street ? this.computation.street : null,
                street_number_id: this.computation.street_number ? this.computation.street_number : null,
                zip_code_id: this.computation.zip_code ? this.computation.zip_code.id : null,
                elements: this.computation.elements ? this.computation.elements : [],
                actual_street_number: this.computation.actual_street_number ? this.computation.actual_street_number : null,
                apartment_number: this.computation.apartment_number ? this.computation.apartment_number : null,
                stair: this.computation.stair ? this.computation.stair : null,
                contract_type_id: this.computation.contract_type ? this.computation.contract_type : [],
                forniture_id: this.computation.forniture ? this.computation.forniture : [],
                constraint_id: this.computation.constraint ? this.computation.constraint : [],
                surface: this.computation.surface ? this.computation.surface : [],
            }
        }
    },
    methods: {
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