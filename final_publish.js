import fs from "fs"
import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

const data = JSON.parse(fs.readFileSync("edc_2024_data.json", "utf8"))

async function createPage(title, slug, html) {
  try {
    await api.pages.add({
      title: title,
      slug: slug,
      html: html,
      status: "published"
    })
    console.log(`✓ Created: ${title}`)
  } catch(err) {
    if(err.message.includes("already exists")) {
      console.log(`- Skipped: ${title} (already exists)`)
    } else {
      console.log(`✗ Failed: ${title} - ${err.message}`)
    }
  }
}

async function main() {
  // Create main teams page
  let teamsHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;">'
  data.teams.forEach(t => {
    teamsHtml += `<a href="/p/${t.id}/" style="padding:20px;background:#f5f5f5;text-decoration:none;color:#333;border-radius:8px;">${t.name}</a>`
  })
  teamsHtml += '</div>'
  
  await createPage("All EDC Teams", "all-edc-teams", teamsHtml)
  
  // Create individual team pages
  for(const team of data.teams) {
    await createPage(team.name, team.id, `<h1>${team.name}</h1><p>2024-2025 Season</p><h3>Roster</h3><p>Coming soon</p>`)
  }
}

main()

