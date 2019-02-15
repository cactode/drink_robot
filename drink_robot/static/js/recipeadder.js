Vue.component('recipe-adder', {
    data: function() {
        return {
            shared: store,
            data: [],
            searched: '',
            selected: null,
            addingName: '',
            addingIngredients: [],
            addingNew: false
        }
    },
    computed: {
        filteredDataArray() {
            return this.data.filter((option) => {
                return option
                    .name
                    .toString()
                    .toLowerCase()
                    .indexOf(this.searched.toLowerCase()) >= 0
            })
        }
    },
    methods: {
        addNewRecipe() {
            axios({
                method: 'post',
                url: '/recipe',
                data: {
                  name: this.name,
                  contents: {
                      vodka: 100
                  }
                }
              });
            this.updateRecipeCache()
            this.addingName = ''
            this.addingIngredients = []
            this.addingNew = false
        },
        updateRecipeCache() {
            axios.get('/recipe')
                .then(function(response) {
                    data = response.data
                })
        },
        addRecipe() {
            if (this.selected) {
                this.store.state.recipes.push({
                    name: this.selected,
                    contents: "Rubbish"
                })
            }
        }
    },
    template: '#recipe-adder-template'
})
