document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
    
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
    
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
    
        });
        });
    }
    
    });


var app = new Vue({
    el: '#app',
    data: {
        bottles: {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            6: null,
            7: null,
        },
        recipes: [],
        settings: false,
        editingBottle: false,
        editingBottleIngredient: "",
        editedBottle: 0,
        help: false
    },
    methods: {
        toSettings: function () {
            this.settings = true;
        },
        toHelp: function() {
            this.help = true;
        },
        goBack: function () {
            this.settings = false;
            this.help = false;
        },
        getBottle: function (position) {
            axios.get('/bottle/' + position).then(response => {
                this.bottles[position] = response.data
            });
        },
        setBottle: function (ingredient) {
            axios.post('/bottle/' + this.editedBottle, {
                ingredient: ingredient.toLowerCase()
            }).then(response => {
                this.getBottle(this.editedBottle);
                this.editingBottle = false;});
        },
        pourBottle: function (ingredient) {
            axios.get('/pour/ingredient/' + ingredient + '/1')
        },
        editBottle: function (position) {
            this.editingBottle = true;
            this.editedBottle = position;
        }
    }
});

for (position of Object.keys(app.bottles)) {
    app.bottles[position] = app.getBottle(position)
}