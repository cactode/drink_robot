var app_state = {
    state: {
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
        settings: false
    }
}
var app = new Vue(
    {
        el: '#app',
        data: app_state
    }
)