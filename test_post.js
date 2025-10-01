import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

api.posts.add({
  title: "Test EDC Teams Post",
  slug: "test-edc-teams",
  html: "<h1>This is a test</h1><p>If you can see this, the API works.</p>",
  status: "published"
}).then(() => {
  console.log("Created as POST - check http://prairiescore.com/test-edc-teams/")
}).catch(err => {
  console.log("Error:", err.message)
})

