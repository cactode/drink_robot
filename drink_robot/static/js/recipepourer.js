Vue.component('recipe-module', {
    data: function() {
        return {
            shared: store
        }
    },
    props: {
        name: String
    },
    methods: {
        pourRecipe: function() {
            axios.get('/pour/recipe/' + this.name)
        }, 
        removeRecipe: function() {
            // fix
        },
        deleteRecipe: function() {
            removeRecipe()
            axios.delete('/recipe/', {
                data: {
                    name: this.name
                }
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