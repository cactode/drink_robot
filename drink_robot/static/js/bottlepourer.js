Vue.component('bottle-module', {
    data: function() {
        return {
            shared: store,
            bottle_ingredient: null
        }
    },
    props: ['bottle_index'],
    methods: {
        editBottle: function() {
            return
        },
        pourBottle: function() {
            axios.get('/pour/ingredient/' + ingredient + '/50')
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