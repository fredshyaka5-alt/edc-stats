import fs from "fs"
import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

const data = JSON.parse(fs.readFileSync("edc_2024_data.json", "utf8"))

async function createPost(title, slug, html) {
  try {
    await api.posts.add({
      title: title,
      slug: slug,
      html: html,
      status: "published"
    })
    console.log(`✓ Created: ${title} at /${slug}/`)
  } catch(err) {
    console.log(`- ${title}: ${err.message}`)
  }
}

async function main() {
  let teamsHtml = '<h1>EDC Basketball Teams 2024-2025</h1><div class="ps3-grid">'
  data.teams.forEach(t => {
    teamsHtml += `<div class="ps3-card"><a href="/${t.id}/">${t.name}</a></div>`
  })
  teamsHtml += '</div>'
  
  await createPost("EDC Teams", "edc-teams", teamsHtml)
  
  for(const team of data.teams) {
    await createPost(team.name, team.id, `<h1>${team.name}</h1><h3>2024-2025 Roster</h3><p>Coming soon</p>`)
  }
}

main()

