/** Option keys shared by the contact form (labels live in messages/*.json) and the API route. */
export const projectTypes = ["ai", "web", "mobile", "custom", "other"] as const;
export const budgetRanges = ["lt5k", "5to15k", "15to40k", "gt40k", "unsure"] as const;

export const contactFields = ["name", "email", "projectType", "budget", "message"] as const;
export type ContactField = (typeof contactFields)[number];

export const MESSAGE_MIN_LENGTH = 10;
