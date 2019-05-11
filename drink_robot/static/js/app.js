var app = new Vue({
    el: '#app',
    data: {
        shared: store
    }, 
    created: function() {
        this.synch()
        this.timer = setInterval(this.synch, 5000)
    },
    methods: {
        synch: function() {
            axios.get('/bottle/')
            .then( response => {
                this.shared.state.bottles = response.data
            })
            axios.get('/recipe')
            .then( response => {
                this.shared.state.recipes = response.data
            })
            console.log("Updated!")
        }
    }
})


