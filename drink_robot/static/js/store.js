var store = {
    debug: true,
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
    },
    turnSettingsOn() {
        if (this.debug) console.log("settings turned on!")
        this.state.settings = true
    },
    turnSettingsOff() {
        if (this.debug) console.log("settings turned off!")
        this.state.settings = false
    },
    assignBottle (bottle, ingredient) {
        if (this.debug) console.log("bottle " + bottle + " assigned to " + ingredient)
        this.bottles[bottle] = ingredient
    }
}