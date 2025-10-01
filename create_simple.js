import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

api.posts.add({
  title: "Davies Eagles Team Page",
  slug: "davies-eagles",
  html: "<h1>Davies Eagles Basketball</h1><p>Team roster and stats for 2024-2025 season.</p>",
  status: "published"
}).then(post => {
  console.log("ACTUALLY CREATED!")
  console.log("Visit: http://prairiescore.com/davies-eagles/")
}).catch(err => {
  console.log("FAILED TO CREATE")
  console.log("Error:", err.message)
  if(err.data) console.log("Details:", JSON.stringify(err.data))
})
