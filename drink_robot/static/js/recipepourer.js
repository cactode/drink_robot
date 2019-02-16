Vue.component('recipe-module', {
    data: function() {
        return {
            shared: store
        }
    },
    props: {
        name:String,
        contents:Object
    },
    methods: {
        pourRecipe: function() {
            axios.get('/pour/recipe/' + this.name)
        },
        removeRecipe: function() {
            let parent = this
            this.shared.state.recipes = this.shared.state.recipes.filter(function (item) {
                console.log(parent.name + " and then " + item.name)
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