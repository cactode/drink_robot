Vue.component('navbar', {
    data: function() {
        return {
            shared: store, 
            help: false
        }
    },
    template: '#navbar-template'
})