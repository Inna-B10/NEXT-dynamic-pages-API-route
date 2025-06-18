# Intro-dynamic-routing-api
### Goal:

Legg til en ny api route, hent informasjonen derifra og vis den i en ny dynamisk underside
- Metadata i layout.jsx,
- Bruk Image komponenten fra next for bilder,
- Sjekk lighthouse observability tool for å sjekke hvor høy score dere får   
<br />

## [Deployed on Vercel](https://next-intro-sandy.vercel.app/) 
<br />

**used libraries:**

```bash
npm install -D @trivago/prettier-plugin-sort-imports prettier
npm install --save-dev eslint-plugin-import
npm install react-feather #icons
npm install path-to-regexp #Turn a path (as /user/:name) into a regular expression
npm install clsx #for constructing className strings conditionally
npm install framer-motion
npm install axios
npm install mongodb
npm install @tanstack/react-query
```
<br />
<br />

- [x] pagination
- [x] notFound page
- [x] product page

## TODOs:

#### *functional:*
- [ ] registration (clerk?)
- [ ] user's role
- [ ] add/delete product
- [ ] shopping card
- [ ] add/delete to shopping card
- [ ] imitation paying process
- [ ] search
- [ ] contact page + check options:
   - [ ] [Send emails with Next.js - Resend](https://resend.com/docs/send-with-nextjs)
   - [ ] [Easy Contact Form to Email Service](https://web3forms.com/)

#### *design:*
- [ ] change image sizes for adaptive layout
- [ ] metadata
- [ ] Logo
- [ ] Skeleton/Loader