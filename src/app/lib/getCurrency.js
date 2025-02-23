import { parseCookies, setCookie } from "nookies";

export async function getCurrencyServerSideProps(context) {
  const cookies = parseCookies(context);
  let currency = cookies.currency;

  if (!currency) {
    const ip = context.req.headers["x-forwarded-for"] || "8.8.8.8";
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    currency = data.currency || "USD";

    setCookie(context, "currency", currency, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  }

  return { props: { currency } };
}
