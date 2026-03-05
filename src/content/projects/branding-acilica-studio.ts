import type { Project } from "./types";

// TODO: Migrate to convention desktop/cover-desktop.(jpg|webp|avif), desktop/01.(jpg|webp|avif), mobile/cover-mobile.*, poster/01.jpg for video posters.
const D = "/projects/acilica/desktop";
const M = "/projects/acilica/mobile";

export const brandingAcilicaStudio: Project = {
  slug: "branding-acilica-studio",
  title: "Acilica",
  year: "2025",
  services: [
    "Naming estratégico",
    "Brand Strategy",
    "Identidad visual",
    "Dirección de arte",
    "Sistema gráfico",
    "Aplicaciones editoriales",
  ],
  industries: ["Arts & Culture"],
  cover: { desktop: `${D}/cover-desktop.jpg`, mobile: `${M}/cover-mobile.png` },
  hero: { desktop: `${D}/cover-desktop.jpg`, mobile: `${M}/cover-mobile.png` },
  gallery: [
    {
      type: "video",
      src: { desktop: `${D}/acilica-1.mp4`, mobile: `${M}/acilica-1.mp4` },
      poster: `${D}/cover-desktop.jpg`,
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-2.jpg`, mobile: `${M}/acilica-2.mp4` },
      alt: "ACILICA STUDIO — construcción tipográfica y logos",
      typeMobile: "video",
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-3.mp4`, mobile: `${M}/acilica-3.jpg` },
      alt: "Acilica — naming y concepto",
      typeMobile: "image",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-4.jpg`, mobile: `${M}/acilica-4.mp4` },
      alt: "ACILICA STUDIO — construcción tipográfica y logos",
      typeMobile: "video",
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-5.mp4`, mobile: `${M}/acilica-5.jpg` },
      typeMobile: "image",
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-6.mp4`, mobile: `${M}/acilica-6.jpg` },
      typeMobile: "image",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-7.jpg`, mobile: `${M}/acilica-7.mp4` },
      alt: "Sistemas modulares y repetición",
      typeMobile: "video",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-8.jpg`, mobile: `${M}/acilica-8.jpg` },
      alt: "ACILICA STUDIO — identidad y sello",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-9.jpg`, mobile: `${M}/acilica-9.mp4` },
      alt: "Aplicaciones editoriales ACILICA",
      typeMobile: "video",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-10.jpg`, mobile: `${M}/acilica-10.jpg` },
      alt: "Folleto y aplicaciones editoriales ACILICA",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-11.jpg`, mobile: `${M}/acilica-11.mp4` },
      alt: "Acilica Studio",
      typeMobile: "video",
    },
    {
      type: "image",
      src: { desktop: `${D}/acilica-12.jpg`, mobile: `${M}/acilica-12.jpg` },
      alt: "Acilica Studio",
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-13.mp4`, mobile: `${M}/acilica-13.jpg` },
      typeMobile: "image",
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-14.mp4`, mobile: `${M}/acilica-14.mp4` },
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-15.mp4`, mobile: `${M}/acilica-15.mp4` },
    },
    {
      type: "video",
      src: { desktop: `${D}/acilica-16.mp4`, mobile: `${M}/acilica-16.jpg` },
      typeMobile: "image",
    },
  ],
};
