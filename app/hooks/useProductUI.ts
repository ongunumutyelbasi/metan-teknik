"use client";

import { useState } from 'react';

export function useProductUI(initialAccordionId: string | null = null) {
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(initialAccordionId);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const offset = 140; // Adjust this based on your sticky header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const targetPosition = elementRect - bodyRect - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    const handleInteraction = (id: string, forceOpen: boolean = false) => {
        const isCurrentlyOpen = openAccordionId === id;

        if (forceOpen) {
            setOpenAccordionId(id);
            setTimeout(() => scrollToSection(id), 50);
        } else if (isCurrentlyOpen) {
            setOpenAccordionId(null);
        } else {
            const needsToWait = openAccordionId !== null;
            setOpenAccordionId(id);

            // Wait for the previous accordion to begin closing before scrolling
            const delay = needsToWait ? 350 : 50;
            
            setTimeout(() => {
                scrollToSection(id);
            }, delay);
        }
    };

    return {
        openAccordionId,
        setOpenAccordionId,
        handleInteraction,
        scrollToSection
    };
}