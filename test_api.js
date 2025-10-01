import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

api.pages.browse().then(pages => {
  console.log("Found", pages.length, "pages")
}).catch(err => {
  console.log("Error:", err.message)
})
