import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

async function check() {
  try {
    const posts = await api.posts.browse({limit: 'all'})
    console.log(`POSTS (${posts.length} total):`)
    posts.forEach(p => {
      console.log(`- "${p.title}" at /${p.slug}/`)
    })
    
    console.log("")
    
    const pages = await api.pages.browse({limit: 'all'})
    console.log(`PAGES (${pages.length} total):`)
    pages.forEach(p => {
      console.log(`- "${p.title}" at /${p.slug}/`)
    })
  } catch(err) {
    console.log("Error:", err.message)
  }
}

check()
