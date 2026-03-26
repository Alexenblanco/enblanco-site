"use client";

import ProjectVideo from "@/components/projects/ProjectVideo";

export default function HomeOfficeVideoBand() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        marginTop: "110px",
        width: "100vw",
        height: "400px",
        position: "relative",
        left: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
      }}
    >
      <div className="relative h-full w-full">
        <ProjectVideo
          src="/home/office-band.mp4"
          poster="/home/office-band-poster.jpg"
          load
          preload="metadata"
          autoplay
          className="rounded-none"
        />
      </div>
    </section>
  );
}
