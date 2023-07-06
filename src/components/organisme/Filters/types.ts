export const FILTER_STATE = {
  HIDDEN: 0, // filter is hidden to user.
  SEARCHBAR: 1, // search filter is open and visible to user.
  TAGS: 2, // search and tags filter is opend and visible to user.
} as const;

export type FilterDisplayState =
  (typeof FILTER_STATE)[keyof typeof FILTER_STATE];
