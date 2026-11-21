# QevoraTech website

Marketing site for **Qevora Technologies** — *Innovation Starts Here*.

Built with [Astro](https://astro.build) (React islands), Tailwind CSS 4, GSAP + Lenis, and React Three Fiber. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check + production build
```

## Editing content

| What | Where |
|---|---|
| Company details, nav, socials | `src/data/site.ts` |
| Services | `src/data/services.ts` |
| Tech stack rows | `src/data/stack.ts` |
| Team members | `src/data/team.ts` |
| Team photos | `src/assets/team/<member-id>.jpg` |
| FAQ | `src/data/faq.ts` |
| Colours & fonts | `src/styles/global.css` |

## Environment

`PUBLIC_WEB3FORMS_KEY` — optional. With it, the contact form posts to Web3Forms; without it, the form opens the visitor's email app.

`legacy/` holds the previous Vite site for reference only; it is not built.
