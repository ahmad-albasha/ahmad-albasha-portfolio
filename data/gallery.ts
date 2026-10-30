/**
 * Photos from events, honors, trainings and student activities, shown on /gallery.
 * Shown in this order within each category — strongest shots first.
 *
 * Images live in /public/gallery (resized to at most 1600px). Width and height are the file's
 * real size so the masonry grid reserves space before each photo loads.
 */

export const galleryCategories = ["honors", "talks", "workshops", "activities"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
}

export const gallery: GalleryPhoto[] = [
  /* ─────────────── Honors & awards ─────────────── */
  { src: "/gallery/activity-06.jpg", width: 1200, height: 1600, category: "honors" },
  { src: "/gallery/activity-02.jpg", width: 1200, height: 1600, category: "honors" },
  { src: "/gallery/activity-07.jpg", width: 1200, height: 1600, category: "honors" },
  { src: "/gallery/activity-03.jpg", width: 1200, height: 1600, category: "honors" },
  { src: "/gallery/activity-04.jpg", width: 1200, height: 1600, category: "honors" },
  { src: "/gallery/activity-05.jpg", width: 1600, height: 1200, category: "honors" },
  { src: "/gallery/activity-01.jpg", width: 900, height: 1598, category: "honors" },
  { src: "/gallery/activity-41.jpg", width: 900, height: 1598, category: "honors" },
  { src: "/gallery/activity-43.jpg", width: 900, height: 1598, category: "honors" },
  { src: "/gallery/activity-52.jpg", width: 900, height: 1600, category: "honors" },
  { src: "/gallery/activity-44.jpg", width: 1179, height: 1513, category: "honors" },
  { src: "/gallery/activity-54.jpg", width: 900, height: 1600, category: "honors" },
  { src: "/gallery/activity-53.jpg", width: 1600, height: 900, category: "honors" },
  { src: "/gallery/activity-45.jpg", width: 1600, height: 900, category: "honors" },
  { src: "/gallery/activity-39.jpg", width: 1600, height: 1067, category: "honors" },
  { src: "/gallery/activity-30.jpg", width: 1439, height: 960, category: "honors" },
  { src: "/gallery/activity-22.jpg", width: 900, height: 1600, category: "honors" },
  { src: "/gallery/activity-14.jpg", width: 900, height: 1600, category: "honors" },
  { src: "/gallery/activity-16.jpg", width: 900, height: 1600, category: "honors" },
  { src: "/gallery/activity-17.jpg", width: 900, height: 1600, category: "honors" },
  /* ─────────────── Talks, panels & judging ─────────────── */
  { src: "/gallery/activity-46.jpg", width: 1066, height: 1600, category: "talks" },
  { src: "/gallery/activity-42.jpg", width: 1200, height: 1600, category: "talks" },
  { src: "/gallery/activity-47.jpg", width: 1065, height: 1600, category: "talks" },
  { src: "/gallery/activity-48.jpg", width: 1066, height: 1600, category: "talks" },
  { src: "/gallery/activity-49.jpg", width: 1067, height: 1600, category: "talks" },
  { src: "/gallery/activity-38.jpg", width: 1200, height: 1600, category: "talks" },
  { src: "/gallery/activity-40.jpg", width: 900, height: 1598, category: "talks" },
  { src: "/gallery/activity-19.jpg", width: 1066, height: 1599, category: "talks" },
  { src: "/gallery/activity-20.jpg", width: 1186, height: 1598, category: "talks" },
  { src: "/gallery/activity-18.jpg", width: 1600, height: 1066, category: "talks" },
  { src: "/gallery/activity-11.jpg", width: 1600, height: 1066, category: "talks" },
  { src: "/gallery/activity-23.jpg", width: 1439, height: 960, category: "talks" },
  { src: "/gallery/activity-31.jpg", width: 1439, height: 960, category: "talks" },
  { src: "/gallery/activity-32.jpg", width: 900, height: 1600, category: "talks" },
  { src: "/gallery/activity-50.jpg", width: 1439, height: 960, category: "talks" },
  /* ─────────────── Trainings & workshops ─────────────── */
  { src: "/gallery/activity-63.jpg", width: 1115, height: 627, category: "workshops" },
  { src: "/gallery/activity-68.jpg", width: 1125, height: 633, category: "workshops" },
  { src: "/gallery/activity-69.jpg", width: 1125, height: 633, category: "workshops" },
  { src: "/gallery/activity-65.jpg", width: 720, height: 1280, category: "workshops" },
  { src: "/gallery/activity-67.jpg", width: 900, height: 1599, category: "workshops" },
  { src: "/gallery/activity-64.jpg", width: 960, height: 540, category: "workshops" },
  { src: "/gallery/activity-24.jpg", width: 1440, height: 1080, category: "workshops" },
  { src: "/gallery/activity-15.jpg", width: 1600, height: 1200, category: "workshops" },
  { src: "/gallery/activity-13.jpg", width: 1600, height: 1066, category: "workshops" },
  { src: "/gallery/activity-12.jpg", width: 1600, height: 1127, category: "workshops" },
  /* ─────────────── Student activities & volunteering ─────────────── */
  { src: "/gallery/activity-76.jpg", width: 1600, height: 1048, category: "activities" },
  { src: "/gallery/activity-70.jpg", width: 1600, height: 1132, category: "activities" },
  { src: "/gallery/activity-75.jpg", width: 1600, height: 1066, category: "activities" },
  { src: "/gallery/activity-28.jpg", width: 1439, height: 960, category: "activities" },
  { src: "/gallery/activity-29.jpg", width: 1600, height: 1200, category: "activities" },
  { src: "/gallery/activity-21.jpg", width: 1600, height: 1200, category: "activities" },
  { src: "/gallery/activity-25.jpg", width: 960, height: 1280, category: "activities" },
  { src: "/gallery/activity-26.jpg", width: 1600, height: 1200, category: "activities" },
  { src: "/gallery/activity-08.jpg", width: 1600, height: 1090, category: "activities" },
  { src: "/gallery/activity-59.jpg", width: 1600, height: 1200, category: "activities" },
  { src: "/gallery/activity-60.jpg", width: 1200, height: 1600, category: "activities" },
  { src: "/gallery/activity-66.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-73.jpg", width: 1536, height: 1152, category: "activities" },
  { src: "/gallery/activity-77.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-72.jpg", width: 1200, height: 1600, category: "activities" },
  { src: "/gallery/activity-57.jpg", width: 1600, height: 900, category: "activities" },
  { src: "/gallery/activity-71.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-74.jpg", width: 1280, height: 1010, category: "activities" },
  { src: "/gallery/activity-61.jpg", width: 1280, height: 720, category: "activities" },
  { src: "/gallery/activity-37.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-33.jpg", width: 1600, height: 900, category: "activities" },
  { src: "/gallery/activity-34.jpg", width: 1600, height: 900, category: "activities" },
  { src: "/gallery/activity-35.jpg", width: 1600, height: 1202, category: "activities" },
  { src: "/gallery/activity-55.jpg", width: 1280, height: 834, category: "activities" },
  { src: "/gallery/activity-09.jpg", width: 1280, height: 720, category: "activities" },
  { src: "/gallery/activity-10.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-36.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-51.jpg", width: 960, height: 1280, category: "activities" },
  { src: "/gallery/activity-56.jpg", width: 1280, height: 960, category: "activities" },
  { src: "/gallery/activity-58.jpg", width: 1600, height: 747, category: "activities" },
];
