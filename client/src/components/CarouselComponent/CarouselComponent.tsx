import { useState } from "react"
import { FavoriteMediaItem } from "../../types/Movies"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"

type CarouselComponentProps = {
  list: FavoriteMediaItem[]
}
export function CarouselComponent({ list }: CarouselComponentProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)

  function currentMedia(index: number) {
    const media = list[index]
    const backgroundImageUrl = `https://image.tmdb.org/t/p/w1280${media.poster_path}`
    return (
      <div className="media-summary-container">
        <img src={backgroundImageUrl} className="backgorund-carousel-image"/>
        <div>{media.title}</div>
      </div>
    )
  }

  function previousMedia(currentIndex: number) {
    if (currentIndex === 0) {
      setSelectedMediaIndex(list.length - 1)
    } else {
      setSelectedMediaIndex((prev) => prev - 1)
    }
  }

  function nextMedia(currentIndex: number) {
    if (currentIndex === list.length - 1) {
      setSelectedMediaIndex(0)
    } else {
      setSelectedMediaIndex((prev) => prev + 1)
    }
  }

  return (
    //add fallback for empty lists
    <div className="carousel-container">
      <button
        className="directionBtn back"
        disabled={list.length === 1}
        onClick={() => previousMedia(selectedMediaIndex)}
      >
        <IoIosArrowBack />
      </button>
      {currentMedia(selectedMediaIndex)}
      <button
        className="directionBtn forward"
        disabled={list.length === 1}
        onClick={() => nextMedia(selectedMediaIndex)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}
