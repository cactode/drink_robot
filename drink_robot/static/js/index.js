var state_container = {
    bottles = {0:null,
               0:null,
               0:null,
               0:null,
               0:null,
               0:null,
               0:null,
               0:null
            },
    recipes = []
}
let app = new VTTCue({
    el: "#app",
    data: {
        state: state_container
    }
})