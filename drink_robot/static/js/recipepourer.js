Vue.component('recipe-module', {
    data: function() {
        return {
            shared: store,
            extras: '',
            showingExtras: false
        }
    },
    props: {
        name:String,
        contents:Object
    },
    methods: {
        pourRecipe: function() {
            this.extras = ''
            let parent = this
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
                    if (parent.extras) {
                        parent.showingExtras = true
                    }
                })
        },
        deleteRecipe: function() {
            this.shared.state.recipes = this.shared.state.recipes.filter(function (item) {
                return this.name != item.name
            })
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
    template: "#recipe-pourer-template"
})