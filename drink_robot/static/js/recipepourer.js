Vue.component('recipe-module', {
    data: function() {
        return {
            shared: store,
            extras: ''
        }
    },
    props: {
        name:String,
        contents:Object
    },
    methods: {
        pourRecipe: function() {
            let parent = this
            this.extras = ''
            axios.get('/pour/recipe/' + this.name)
                .then(response => {
                    let data = response.data
                    for (datum of Object.keys(data)) {
                        parent.extras = parent.extras 
                                      + datum 
                                      + ": "
                                      + data[datum]
                                      + "mL, "
                    }
                })
        },
        removeRecipe: function() {
            let parent = this
            this.shared.state.recipes = this.shared.state.recipes.filter(function (item) {
                return parent.name != item.name
            })
        },
        deleteRecipe: function() {
            this.removeRecipe()
            const formData = new FormData()
            formData.append('name', this.name)
            axios({
                method: 'delete',
                url: '/recipe',
                data: formData
            })
        }
    },
    template: "#recipe-module-template"
})

Vue.component('recipe-pourer', {
    data: function() {
        return {
            shared: store
        }
    },
    mounted: function() {
        axios.get('/recipe')
            .then( response => {
                for (datum of response.data) {
                    this.shared.state.recipes.push(datum)
                }
            })
    },
    template: "#recipe-pourer-template"
})