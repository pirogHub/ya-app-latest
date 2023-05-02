export const code_aboutLand = `
const FullAboutLand = {
    aboutLand: {
        label: "Об участке",
        wrapper: "group",
        components: {
            area: {
                area_total: {
                    author: {                        
                        mongoType: Number,           
                        random: function () { ... }, 
                        label: "...",
                        type: "...",
                        config: {
                        }
                    },
                    seeker: {
                        label: "...",
                        type: "...",
                        random: function () { ... },
                        config: {..}
                    }
                }
            },
            type: {
                author: {...},

                seeker: {...}
            },
        }

    }
}`