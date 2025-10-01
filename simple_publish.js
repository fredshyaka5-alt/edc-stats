import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

async function createTestPage() {
  try {
    const page = await api.pages.add({
      title: "EDC Teams Test",
      slug: "edc-teams-test",
      html: "<h1>EDC Basketball Teams</h1><p>This is a test page for teams.</p>"
    })
    console.log("Created page:", page.title, "at", page.url)
  } catch(err) {
    console.log("Error creating page:", err.message)
  }
}

createTestPage()
