export default {
    pages: {
        Articles: {
            title: 'Articles',
            listHeaders: {
                ArticleNo: "Article no.",
                act: 'act',
            }
        },
        ArticlesInCarton: {
            title: 'Articles in Carton',
        },
        Summary: {
            title: 'Summary',
            pages: {
                Cartons: 'Cartons',
                Articles: 'Articles',
            },
            listHeaders: {
                CartonNo: "carton no.",
            }

        },
        Camera: {
            title: 'Camera',
            flashModes: {
                Flash: 'Flash',
                on: 'on',
                off: 'off',
                auto: 'auto',
                torch: 'torch',
            },
            fallBack: 'No access to camera',
            SNAP: 'SNAP',
        },
        Map: {
            title: 'Map',
            Navigation: 'Navigation',
            Markers: {
                youAreHere: 'You are here',
                goodPlace: 'Good place',
                simplePlace: 'Simple place',
            }
        },
        Login: {
            title: 'Login'
        },
        WebViewPage: {
            title: 'WebViewPage'
        },
        FingerPrint: {
            title: 'FingerPrint'
        },
    },
    pageHeader: {
        Cancel: 'Cancel',
        Confirm: 'Confirm',
        Prepare: 'Prepare',
    },
}