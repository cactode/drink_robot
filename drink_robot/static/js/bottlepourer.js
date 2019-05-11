Vue.component('bottle-module', {
    data: function() {
        return {
            shared: store,
            editing: false,
            editedIngredient: "",
            search: [],
        }
    },
    props: {
        bottle_index: Number
    },
    methods: {
        editBottle: function(newIngredient) {
            this.shared.state.bottles[this.bottle_index] = newIngredient
            axios.post('/bottle/' + this.bottle_index, {
                ingredient: newIngredient
            })
        },
        pourBottle: function() {
            axios.get('/pour/ingredient/' + this.shared.state.bottles[this.bottle_index] + '/50')
        },
        markAsEmpty: function() {
            this.editBottle(null)
            this.editedIngredient = ""
        },
        toggleEdit: function() {
            if (!this.editing) {
                this.editing = true;
                if (this.shared.state.bottles[this.bottle_index]) {
                    this.editedIngredient = this.shared.state.bottles[this.bottle_index].toLowerCase()
                }
            } else {
                this.editing = false;
                if (!this.editedIngredient) {
                    return
                } else {
                    this.shared.state.bottles[this.bottle_index] = this.editedIngredient.toLowerCase()
                    this.editBottle(this.editedIngredient.toLowerCase())
                }
            }
        },
        refreshSearch() {
            axios.get('/ingredients').then((r) => {
                this.search = r.data.agg.filter((l) => l.indexOf(this.editedIngredient) > -1);
            });
        },
    },
    template: '#bottle-module-template'
})

Vue.component('bottle-pourer', {
    data: function() {
        return {
            shared: store
        }
    },
    mounted: function() {
        for (position of Object.keys(this.shared.state.bottles)) {
            let pos = Number(position)
            axios.get('/bottle/' + pos).then(response => {
                this.shared.state.bottles[pos] = response.data != 'null' ? response.data : null
            })      
        }
    },
    template: '#bottle-pourer-template'
})