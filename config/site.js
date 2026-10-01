/*
 * Main site configuration.
 * Edit this file to change your name, metadata, navigation, and background image.
 * No build step is required.
 */
window.SITE_CONFIG = {
  name: "潘宇冲 Yuchong Pan",
  siteTitle: "Yuchong Pan",
  description: "Personal website of Yuchong Pan.",

  // Put your own image in assets/images/ and change this path.
  // A wide landscape photo works best because it fills the entire home page
  // and the left side of inner pages, just like bshepherd.ca.
  backgroundImages: [
    "assets/images/panorama-ridge.jpg",
    "assets/images/atwell-peak.jpg",
    "assets/images/opal-cone.jpg",
    "assets/images/black-tusk.jpg"
  ],

  navigation: [
    { key: "research", label: "Research", href: "research/index.html" },
    { key: "events",   label: "Events",   href: "events/index.html" },
    { key: "contact",  label: "Contact",  href: "contact/index.html" },
    { key: "bio",      label: "Bio",      href: "bio/index.html" }
  ]
};
