Vue.component('bottle-module', {
    data: function() {
        return {
            shared: store,
            bottle_ingredient: null
        }
    },
    props: {
        bottle_index: Number
    },
    methods: {
        editBottle: function() {
            if (!this.bottle_ingredient) {
                return
            }
            axios.post('/bottle/' + this.bottle_index, {
                ingredient: this.bottle_ingredient.toLowerCase()
            })
        },
        pourBottle: function() {
            axios.get('/pour/ingredient/' + this.bottle_ingredient + '/50')
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
    template: '#bottle-pourer-template'
})