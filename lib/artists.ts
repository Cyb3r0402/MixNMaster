/**
 * Artist & video configuration for the Videos page carousel.
 *
 * ── HOW TO ADD YOUR OWN VIDEOS ──
 * 1. Go to any YouTube video and copy the video ID from the URL:
 *    https://www.youtube.com/watch?v=XXXXXXXXX  ← that's the ID
 * 2. Paste it into the `videoIds` array below.
 *
 * ── HOW TO ADD ANOTHER ARTIST ──
 * Copy one of the objects below and change the fields.
 * The first artist in the array is selected by default.
 */

export interface Artist {
  /** Display name */
  name: string;
  /** URL-safe slug (used for tab selection) */
  slug: string;
  /** Short bio shown under the artist name */
  description: string;
  /** Link to their YouTube channel (opens in new tab) */
  channelUrl: string;
  /** YouTube video IDs to display in the carousel */
  videoIds: string[];
}

/**
 * Edit this array to manage artists and their videos.
 * Add or remove video IDs as needed — no livestreams, just music!
 */
export const ARTISTS: Artist[] = [
  {
    name: 'KDUB',
    slug: 'kdub',
    description:
      'Official audio releases, freestyles, and music from KDUB. New tracks dropping regularly.',
    channelUrl: 'https://www.youtube.com/@KDUB_25',
    videoIds: [
      'iFhiq_ZVeBQ',  // I Don't Understand (Official Audio)
      '-bKmP6_9cWA',  // Freestyle (Official Audio)
      'mphd0_CmPh8',  // All Over The Place
      'tkIUMv9MfW0',
      'L5Z1s7G3syE',
    ],
  },
  // ── FEATURED ARTISTS ──
  // To add another artist, uncomment and edit the block below:
  //
  // {
  //   name: 'Artist Name',
  //   slug: 'artist-name',
  //   description: 'Short bio or description of this artist.',
  //   channelUrl: 'https://www.youtube.com/@artisthandle',
  //   videoIds: [
  //     'VIDEO_ID_1',
  //     'VIDEO_ID_2',
  //   ],
  // },
];
