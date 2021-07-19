// Now is useless because, using redux store as source of truth
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import CameraRoll from "@react-native-community/cameraroll";
import { useEffect, useState } from "react";

async function getGallery(setGallery) {
    const params = { first: 10 }
    const res = await CameraRoll.getPhotos(params)
    console.log('Opa here are some images')
    return setGallery(res.edges.map(it => ({ uri: it.node.image.uri, id: uuid()})))
}
export const useGallery = () => {
    const [galleryData, setGalleryData] = useState([])
    const fetchGallery = () => {
        getGallery(setGalleryData)
    }
    useEffect(() => {
        fetchGallery()
    }, [])

    return [galleryData, fetchGallery]
}