export const code_generating = `
const  {
    mongoSchema: landSchema,
    mongoModel: landModel,

    AuthorWithRandomFuncs: land_AuthorWithRandomFuncs,
    AuthorStruct: land_AuthorForClient,

    SeekerWithRandomFuncs: land_SeekerWithRandomFuncs,
    SeekerStruct: land_SeekerForClient,

} = structManipulate.generateStructs(landFullStruct, "land")

            // и теперь просто раскладываем это красиво

const land = {
    mongo: {
        schema: landSchema,                 // -схема для модели mondoDb в чистом виде
        mongoModel: landModel               // -сама модель
    },
    author: {   // Автору объявления
        client: land_AuthorForClient,       // -пропсы для ui-инпутов на клиенте, чтоб их отрисовать
        random: land_AuthorWithRandomFuncs, // -объект, состоящий из функций, которые находились в полях author.random у OFFER-Father
                                            // генерирует случайное объявление типа "Земля"
    
    },
    seeker: {  // Искателю объявления
        client: land_SeekerForClient,       // пропсы для ui-инпутов (фильтров) на клиенте, чтоб их отрисовать
        random: land_SeekerWithRandomFuncs, // -объект, состоящий из функций, которые находились в полях seeker.random у OFFER-Father
                                            // генерирует случайные значения фильтров для поиска в офферах "Земли"
}

module.exports = land
`