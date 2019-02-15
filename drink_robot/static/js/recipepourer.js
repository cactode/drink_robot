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
            return
        },
        deleteRecipe: function() {
            this.removeRecipe()
            const formData = new FormData()
            formData.append('name', this.name)
            axios({
                method: 'delete',
                url: '/recipe',
                data: formData
              });
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