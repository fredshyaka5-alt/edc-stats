import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

api.pages.add({
  title: "EDC Teams",
  slug: "edc-teams",
  html: "<h1>Eastern Dakota Conference Teams</h1><p>Davies, North, South, Central, Red River, Shanley, West Fargo, Horace, Sheyenne</p>",
  status: "published"
}).then(page => {
  console.log("SUCCESS! Page created.")
  console.log("Title:", page.title)
  console.log("URL:", page.url || page.slug)
}).catch(err => {
  console.log("FAILED:", err.message)
  if(err.data && err.data.errors) {
    err.data.errors.forEach(e => console.log("- " + e.message))
  }
})

