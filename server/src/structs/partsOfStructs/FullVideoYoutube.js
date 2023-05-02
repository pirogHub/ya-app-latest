const FullVideoYoutube = {
    videoYoutube: {
        label: "Видео на Youtube",
        wrapper: "group",

        isNotRequired: true,
        mongoType: String,
        author: {
            random: function () { this.videoYoutube = "https://www.youtube.com/watch?v=pAP9LqDqR_c" },
            type: "videoYoutube",
        }


    }
}

module.exports = FullVideoYoutube