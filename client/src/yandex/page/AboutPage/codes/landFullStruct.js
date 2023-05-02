export const code_landFullStruct = `
const landFullStruct = {
    ...getMongoTypeAndCategory({ type: "sell", category: "land" }),
    ...FullAddress,
    ...FullAboutLand,
    ...FullImgPlan,
    ...FullImgPhotos(Land.data.imgPhotos.guideLabel),
    ...FullDescription(),
    ...FullVideoYoutube,
    ...FullPriceDetails(Land.data.priceDetails), 
    ...FullAdditionaly,
    ...getMongoUserId(),
    ...FullServiceInfo
}`