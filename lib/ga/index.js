import { getCookieConsentValue } from "react-cookie-consent";
// log the pageview with their URL
export const pageview = (url) => {
  if (getCookieConsentValue() !== "false") {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }) => {
  if (getCookieConsentValue() !== "false") {
    window.gtag("event", action, params);
  }
};
