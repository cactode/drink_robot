// Vue.component('recipe-adder', {
//     data: function() {
//         return {
//             shared: store,
//             data: [],
//             searched: '',
//             selected: null,
//             addingName: '',
//             addingIngredients: '',
//             addingNew: false
//         }
//     },
//     computed: {
//         filteredDataArray() {
//             return this.data.filter((option) => {
//                 return option
//                     .name
//                     .toString()
//                     .toLowerCase()
//                     .indexOf(this.searched.toLowerCase()) >= 0
//             }).map(option => {
//                 return option.name 
//             });
//         }
//     },
//     methods: {
//         addNewRecipe() {
//             const formData = new FormData()
//             formData.append('name', this.addingName)
//             formData.append('contents', this.addingIngredients)
//             axios({
//                 method: 'post',
//                 url: '/recipe',
//                 data: formData
//               });
//             this.updateRecipeCache()
//             this.addingName = ''
//             this.addingIngredients = ''
//             this.addingNew = false
//         },
//         updateRecipeCache() {
//             axios.get('/recipe')
//                 .then(this.pushRecipeCache)
//         },
//         pushRecipeCache(response) {
//             this.data.length = 0
//             for (datum of response.data) {
//                 console.log(datum)
//                 this.data.push(datum)
//             }
//         },
//         addRecipe() {
//             if (this.selected) {
//                 this.shared.state.recipes.push(
//                     {
//                         name: this.selected,
//                         contents: "Garbage"
//                     }
//                 )
//             }
//         }
//     },
//     created: function() {
//         this.updateRecipeCache()
//     },
//     template: '#recipe-adder-template'
// })
