export const APPLICATION_TYPES = [
    "Assistive listening and audience engagement", "Filmmaking", "Broadcast", "Corporate", "Education", 
    "Live production & touring", "Live theatre", "Meeting and conference", "Mobile journalism", "Presentation",
    "Studio recording", "Virtual reality", "Visitor guidance", "Places of worship"
] as const;

export const MICROPHONE_FORMS = [
    "Bodypack", 
    "Boundary microphone", 
    "Camera", 
    "Capsule",
    "Ceiling microphone",
    "Clip",
    "Gooseneck microphone",
    "Handheld",
    "Headset",
    "Lavalier",
    "Miniature microphone",
    "Shotgun",
    "Side address",
    "Stand / boom mounted",
    "Bar",
    "Headmic",
] as const;

export const PICKUP_PATTERN = [
    "Half cardioid",
    "Stereo",
    "Widecardioid",
    "Cardioid",
    "Lobar",
    "Multipattern",
    "Omnidirectional",
    "Supercardioid",
] as const;

export const TRANSDUCER_TYPE = [
    "Permanently-polarized condenser",
    "True condenser",
    "Condenser",
    "Dynamic",
] as const;

export const CONNECTION = [
    "Kablolu",
    "Kablosuz",
] as const;

export const CONNECTOR = [
    "3.5mm",
    "6.3mm",
    "3-pin XLR",
    "5-pin XLR",
    "USB",
    "LEMO3",
    "RJ45 (for Ethernet)",
] as const;

export const PRODUCT_SERIES = [
    "2000",
    "AVX",
    "Digital 6000",
    "Digital 9000",
    "evolution",
    "evolution wireless digital",
    "evolution wireless G4",
    "EW-DX",
    "MK",
    "MKH",
    "Speechline Digital Wireless",
    "Speechline Wired",
    "Teamconnect",
    "Tourguide",
    "XS Lav", 
    "XS Wireless",
    "XS Wireless Digital",
    "EW-DP",
    "Profile",
] as const;

export const SYSTEM_PART = [
    "Aksesuarlar",
    "Mikrofonlar",
    "Setler",
    "Masa üstü ayaklar",
    "Vericiler",
    "Bodypacks",
    "Combiners",
    "Handheld",
    "Monitoring",
    "Alıcılar",
    "Antenler",
] as const;

export const PRODUCT_TYPE = [
    "Çift Yönlü İletişim",
    "Monitörleme",
    "Kablosuz Sistemler",
    "Yedek Parçalar",
    "Yazılımlar",
] as const;

export const LOCATION = [
    "Küçük oda",
    "Orta boy oda",
] as const;

export const TECHNOLOGY = [
    "Analog",
    "Dijital",
] as const;

export const WEARING_STYLE = [
    "Kulak içi",
    "Kulak çevreleyen",
    "Kulak üstü"
] as const;

export const AUDIO_SOURCE = [
    "Enstrüman",
    "Vokal"
] as const;

// This turns the lists above into "Types"
export type ApplicationType = typeof APPLICATION_TYPES[number];
export type MicrophoneForm = typeof MICROPHONE_FORMS[number];
export type PickupPattern = typeof PICKUP_PATTERN[number];
export type TransducerType = typeof TRANSDUCER_TYPE[number];
export type Connection = typeof CONNECTION[number];
export type Connector = typeof CONNECTOR[number];
export type ProductSeries = typeof PRODUCT_SERIES[number];
export type SystemPart = typeof SYSTEM_PART[number];
export type ProductType = typeof PRODUCT_TYPE[number];
export type Location = typeof LOCATION[number];
export type WearingStyle = typeof WEARING_STYLE[number];
export type AudioSource = typeof AUDIO_SOURCE[number];
export type Technology = typeof TECHNOLOGY[number];

export interface SennheiserProduct {
    id: number;
    name: string;
    applicationTypes: ApplicationType[]; // Only allows values from the list above
    microphoneForm: MicrophoneForm[];      // Only allows one value from that list
    pickupPattern: PickupPattern;        // Only allows one value from that list
    transducerType?: TransducerType;  // Optional field
    connection?: Connection;          // Optional field
    connectors?: Connector[];         // Optional array of values from that list
    productSeries?: ProductSeries[];  // Optional array of values from that list
    articleNo: string;
    link: string;
    systemPart?: string[];
    productType?: string[];   
    location?: string[];
    technology?: string[];
    wearingStyle?: WearingStyle[];
    audioSource?: AudioSource[];
    image?: string[];
    category: string;
}