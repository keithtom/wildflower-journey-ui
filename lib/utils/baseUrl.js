// https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
// export const baseUrl = 'http://localhost:3001';
// export const baseUrl = "https://api-dev.wildflowerschools.org";
// export const baseUrl = "https://api-staging.wildflowerschools.org";
export default process.env.API_URL || "http://localhost:3001";