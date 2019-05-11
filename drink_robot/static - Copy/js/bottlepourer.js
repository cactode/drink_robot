Vue.component('bottle-module', {
    data: function() {
        return {
            shared: store,
        }
    },
    props: {
        bottle_index: Number
    },
    methods: {
        editBottle: function() {
            if (!this.shared.state.bottles[this.bottle_index]) {
                return
            }
            axios.post('/bottle/' + this.bottle_index, {
                ingredient: this.shared.state.bottles[this.bottle_index].toLowerCase()
            })
        },
        pourBottle: function() {
            axios.get('/pour/ingredient/' + this.shared.state.bottles[this.bottle_index] + '/50')
        }
    },
    template: '#bottle-module-template'
})

Vue.component('bottle-pourer', {
    data: function() {
        return {
            shared: store
        }
    },
    mounted: function() {
        for (position of Object.keys(this.shared.state.bottles)) {
            let pos = Number(position)
            axios.get('/bottle/' + pos).then(response => {
                this.shared.state.bottles[pos] = response.data != 'null' ? response.data : null
            })      
        }
    },
    template: '#bottle-pourer-template'
})