

const FullServiceInfo = {
    FullServiceInfo: {
        titles: {
            mainTitle: {
                isNotRequired: true,
                mongoType: String,
                author: {

                }
            },
            additionalTitle: {
                isNotRequired: true,
                mongoType: String,
                author: {

                }
            },
            additionalTitleWithLink:
            {
                isNotRequired: true,
                isExist: {
                    isNotRequired: true,
                    mongoType: Boolean,
                },
                contentStart: {
                    isNotRequired: true,
                    mongoType: String,
                },
                contentIntoLink: {
                    isNotRequired: true,
                    mongoType: String,
                },
                contentEnd: {
                    isNotRequired: true,
                    mongoType: String,
                },

                author: {

                }
            }
        }
    }
}

module.exports = FullServiceInfo