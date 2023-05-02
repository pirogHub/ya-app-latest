const Author = require("../../../../data/Author")
const randomTools = require("../../../../randomTools/randomTools")


const dataAccordingRools = {
    dealType: [
        { label: "Свободная продажа", value: "freeSell" },
        { label: "Альтернатива", value: "alternative" },
    ],
    additionaly: [
        { label: "Возможен торг", value: "bargaining" },
        { label: "Ипотека", value: "mortgage" },
    ]
}

const data = randomTools.changeValuesByLabelsAtArraysOfObject(dataAccordingRools)

const priceDetails = {
    dealType: {
        author: {
            random: function () { this.dealType = [...randomTools.getRandomValueFrom(data.dealType)] },
            mongoType: [String],
            label: "Тип сделки",
            type: "radio",
            config: {
                options: [...data.dealType],
                optionsView: "button"
            }
        }
    },
    additionaly: {
        author: {
            isNotRequired: true,
            random: function () { this.additionaly = [...randomTools.getRandomValueFrom(data.additionaly)] },
            mongoType: [String],
            label: "Дополнительно",
            type: "radio",
            config: {
                options: [...data.additionaly],
                optionsView: "button"
            }
        }
    },

}

module.exports = priceDetails