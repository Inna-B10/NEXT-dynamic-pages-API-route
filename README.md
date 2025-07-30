# Intro-dynamic-routing-api
### Goal:

Legg til en ny api route, hent informasjonen derifra og vis den i en ny dynamisk underside
- Metadata i layout.jsx,
- Bruk Image komponenten fra next for bilder,
- Sjekk lighthouse observability tool for å sjekke hvor høy score dere får   

### [Deployed on Vercel](https://next-intro-sandy.vercel.app/)



## Start project:

**1. define admin:**  
create the first user in Clerk dashboard and use its id and email in the .env file as SUPERUSER_CLERK_ID and SUPERUSER_EMAIL

**2. required environments:**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI= 
MONGODB_NAME=

#admin
SUPERUSER_CLERK_ID= #from clerk User ID
SUPERUSER_EMAIL= #from clerk Primary email

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL='/auth?mode=sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/auth?mode=sign-up'
```


**3. after first start of the project**  
- go to http://localhost:3000/api/init-db   
for initiate DB and create collections, indexes  and admin user in DB 
- then run in the terminal ./src/scripts/seed.js   
for seeding data in the DB
---
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
npm install @clerk/nextjs
npm install @clerk/themes
npm install tailwind-merge
npm install react-hot-toast
npm install dotenv #needs for seeding data
```
<br />
<br />




- [x] pagination
- [x] notFound page
- [x] category page
- [x] registration (clerk?)
- [x] product page
- [x] add/delete to shopping card
- [x] add/delete to favorites
- [x] change image sizes for adaptive layout
- [x] ToTop button


## TODOs:

#### *functional:*
- [?] user's role
- [ ] add/delete product
- [ ] shopping card page
- [ ] favorite page
- [ ] imitation paying process
- [ ] search
- [ ] contact page + check options:
   - [ ] [Send emails with Next.js - Resend](https://resend.com/docs/send-with-nextjs)
   - [ ] [Easy Contact Form to Email Service](https://web3forms.com/)

#### *design:*
- [?] metadata
- [ ] Logo
- [ ] Skeleton/Loader
- [ ] User's buttons break point 480 (menu)
- [ ] Layout
- [?] Sidebar
- [ ] Footer