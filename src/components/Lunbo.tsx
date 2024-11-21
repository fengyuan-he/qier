import "react-responsive-carousel/lib/styles/carousel.css"
import {Carousel} from "react-responsive-carousel";
import Image from "next/image";

interface LunboProps {
    items: string[]
}

export default function Lunbo({items}: LunboProps) {
    return (
        <Carousel showArrows showThumbs={false}>
            {items.map(value =>
                <Image
                    key={value}
                    src={value}
                    alt={value}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: '100%', height: 'auto'}}
                />
            )}
        </Carousel>
    )
}