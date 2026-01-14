import Image from "next/image";

interface CategoryHeroProps {
    title: string;
    subtitle?: string;
    imageSrc: string;
    imageAlt?: string;
}

export default function CategoryHero({ 
    title, 
    subtitle, 
    imageSrc, 
    imageAlt = "Sennheiser Hero" 
}: CategoryHeroProps) {
    return (
        <section data-nav-color="light" className="relative w-full h-[500px] overflow-hidden">
            <Image 
                src={imageSrc}
                alt={imageAlt}
                fill
                priority 
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-[90px] px-[20px] text-white antialiased subpixel-antialiased">
                <div className="max-w-full text-left pb-[0px] md:pb-0">
                    <h1 className="antialiased subpixel-antialiased text-[50px] leading-[1.1] pb-[20px] font-medium [hyphens:auto]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="antialiased subpixel-antialiased text-[32px] leading-[1.1] opacity-75 font-medium [hyphens:auto]">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}