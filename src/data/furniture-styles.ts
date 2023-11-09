import modernImage from "../assets/images/styles/modern.jpg";
import nordicImage from "../assets/images/styles/nordic.jpg";
import americaImage from "../assets/images/styles/america.jpg";
import minimalismImage from "../assets/images/styles/minimalism.jpg";
import bohoImage from "../assets/images/styles/boho.jpg";
import classicImage from "../assets/images/styles/classic.jpg";
import loftImage from "../assets/images/styles/loft.jpg";
import luxuryImage from "../assets/images/styles/luxury.jpg";

export const FURNITURE_STYLES = [
    {
        name: "Modern",
        image: modernImage,
        type: 'modern',
        isAvailable: true
    },
    {
        name: "Nordic",
        image: nordicImage,
        type: 'scandinavian',
        isAvailable: true
    },
    {
        name: "America",
        image: americaImage,
        type: 'american',
        isAvailable: false
    },
    {
        name: "Minimalism",
        image: minimalismImage,
        type: 'minimalism',
        isAvailable: false
    },
    {
        name: "Boho",
        image: bohoImage,
        type: 'transitional',
        isAvailable: true
    },
    {
        name: "Classic",
        image: classicImage,
        type: 'classical',
        isAvailable: true
    },
    {
        name: "Loft",
        image: loftImage,
        type: 'loft',
        isAvailable: true
    },
    {
        name: "Luxury",
        image: luxuryImage,
        type: 'luxury',
        isAvailable: false
    },
];
