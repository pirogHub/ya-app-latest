import React, { createRef, useEffect, useRef, useState } from "react"

import "../sliders.scss"
import "./bigSliderYa.scss"
import { useAllWindowSlider } from "../useAllWindowSlider"
import ServerImg from "../../../ServerImg/ServerImg"
import { imgPathReplace } from "../../../../utils/imgPathReplace"

const BigSliderYa = ({ images, imagesPlan, onBottomButtonsClick }) => {

    const refGalery = createRef()
    const refBtnPrev = createRef()
    const refBtnNext = createRef()
    let idx = 0
    const refCurrentIndex = useRef(0)
    const [showAtAllWindowSlider,] = useAllWindowSlider()

    const [photosSaved, setPhotosSaved] = useState([])
    const [plansSaved, setPlansSaved] = useState([])
    const [toRerender, toggleToRerender] = useState(false)

    const saveImgsToBrowser = async (contentArr, setter) => {
        setter(contentArr)
        if (contentArr) {
            await contentArr.forEach(async (mylink, index) => {
                let imgsaved = ""
                try {
                    const response = await fetch(imgPathReplace(mylink))


                    const imgblob = await response.blob()
                    imgsaved = URL.createObjectURL(imgblob)
                } catch (error) {

                }

                setter(prev => {
                    const newstate = prev
                    const idx = newstate.findIndex(i => i === mylink)
                    if (idx !== -1) newstate[idx] = { myBlob: imgsaved }

                    return newstate
                })
            })
        }
    }

    useEffect(() => {
        saveImgsToBrowser(imagesPlan, setPlansSaved)
        return () => { plansSaved.forEach(i => { if (i?.myBlob) URL.revokeObjectURL(i.myBlob) }) }
    }, [imagesPlan])

    useEffect(() => {
        saveImgsToBrowser(images, setPhotosSaved)
        return () => { photosSaved.forEach(i => { if (i?.myBlob) URL.revokeObjectURL(i.myBlob) }) }
    }, [images])

    useEffect(() => {
        refBtnPrev.current.style.visibility = "hidden"
        refGalery.current.scrollLeft = 500
        const tmp = { ...(refGalery.current) }
    })

    useEffect(() => {

        scrollToStart()
    }, [refGalery])



    const handleClick = (duration) => {
        idx = duration
            ? (idx + 1) < images.length ? (idx + 1) : images.length - 1
            : idx = (idx - 1) >= 0 ? (idx - 1) : 0

        refCurrentIndex.current = idx
        refBtnNext.current.style.visibility = idx === (images.length - 1) ? "hidden" : "visible"
        refBtnPrev.current.style.visibility = idx === 0 ? "hidden" : "visible"

        refGalery.current.children[idx].scrollIntoView({ block: "nearest", inline: "start" })


    }

    const scrollToStart = () => {

        if (!refGalery.current) return
        if (refGalery?.current.children?.length === images.length) {

            setTimeout(() => {
                if (refGalery.current)
                    refGalery.current.scrollLeft = 0
            }, 1000)
        } else {
            setTimeout(() => { scrollToStart() }, 1000)
        }
    }

    return (

        <div className="BigSliderYa_galleryWrapper">

            <div className="BigSliderYa_gallery">
                <div className="gallery__controlls_wrapper">
                    <div
                        className="gallery__control gallery__controlPrevImage gallery__controlScroll gallery__controlPrev "
                        ref={refBtnPrev}
                        onClick={() => handleClick(false)}
                    >
                        <button className="btn btn-cirle btn-white"><i className="bi bi-arrow-left"></i></button>
                    </div>

                    <div
                        className="gallery__control gallery__controlNextImage gallery__controlScroll gallery__controlNext"
                        ref={refBtnNext}
                        onClick={() => handleClick(true)}
                    >
                        <button className="btn btn-cirle btn-white"><i className="bi bi-arrow-right"></i></button>
                    </div>
                </div>
                <div className="gallery__slides">
                    <div ref={refGalery} className="gallery__slidesContainer gallery__slidesContainerWithSnapScroll">

                        {photosSaved.map((i, idx) => (
                            <div className="gallery__slide gallery__slideWithSnapScroll gallerySlide__imageWrapper gallerySlide__planWrapper" key={idx}>
                                {/* <img alt="" className="gallerySlide__wrappedImage" src={i?.myBlob ? i.myBlob : i} /> */}
                                <ServerImg isDebug={true} alt="" className="gallerySlide__wrappedImage" src={i?.myBlob ? i.myBlob : i} />
                            </div>
                        ))}

                    </div>
                </div>



                <div className="gallery__badges">
                    <button
                        onClick={() => showAtAllWindowSlider({ photos: photosSaved, plans: plansSaved, lastIndex: refCurrentIndex.current, wasClickOnPhotosNotPlans: true })}
                        className="btn btn-white">
                        <i className="bi bi-images"></i>{photosSaved.length} фото
                    </button>
                    {plansSaved && <button
                        onClick={() => showAtAllWindowSlider({ photos: photosSaved, plans: plansSaved, lastIndex: refCurrentIndex.current, wasClickOnPhotosNotPlans: false })}
                        className="btn btn-white"
                    >План этажа</button>}
                </div>
            </div>
        </div>

    )

}

export default BigSliderYa