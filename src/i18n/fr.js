export default {
    pages: {
        Articles: {
            title: 'Des articles',
            listHeaders: {
                ArticleNo: "N° d'article.",
                act: 'acte',
            }
        },
        ArticlesInCarton: {
            title: 'Articles en carton',
        },
        Summary: {
            title: 'Résumé',
            pages: {
                Cartons: 'Cartons',
                Articles: 'Des articles',
            },
            listHeaders: {
                CartonNo: "Carton non.",
            }
        },
        Camera: {
            title: 'Caméra',
            flashModes: {
                Flash: 'Éclat',
                on: 'éteint',
                off: 'allumé',
                auto: 'automatique',
                torch: 'torche',
            },
            SNAP: 'Prendre la photo',
            fallBack: "Pas d'accès à la caméra",
        },
        Map: {
            title: 'Carte',
            Navigation: 'La navigation',
            Markers: {
                youAreHere: "Tu es là",
                goodPlace: 'Bon endroit',
                simplePlace: 'Endroit simple',
            }
        },
        Login: {
            title: 'Connexion'
        },
        WebViewPage: {
            title: "Page d'affichage Web"
        },
        FingerPrint: {
            title: 'Empreinte digitale'
        },
    },
    pageHeader: {
        Cancel: 'Annuler',
        Confirm: 'Confirmer',
        Prepare: 'Préparer',
    },    
}