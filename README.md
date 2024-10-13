# Tech stack:
- SQL DB:PostgreSQL, no migrations were used due to app simplicity(Primsa is better when working on a bigger app that keeps evolving)
- Front-end tech: Next.js, could have used React/React Native but I am more familiar with Next.js, the routing part is way easier to set-up + you get multiple perks like Image oprimization and SEO advantages
- Back-end: Node.js, I used Express for the APIs and JWT for User Auth.
- Used custom API to get information about Stock market, I commented out the real API call, I used dummy data to simulate real time API
- Used shadcn/UI for the front-end, Tailwind is good but it needs a lot of tunning to get the UI looking great

# Improvements:
- Use Prisma for the DB, use migrations
- The CRUD for personal investments is there but you cannot sell or buy actually stocks, this is just a simulation
- Add friendlier UI
- Add more functionaliti, maybe create some microservice to warn the user when some stocks change
