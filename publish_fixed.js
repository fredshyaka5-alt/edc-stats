import fs from "fs"
import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

async function main() {
  const raw = fs.readFileSync("edc_2024_data.json", "utf8")
  const data = JSON.parse(raw)
  
  console.log("Creating teams page...")
  
  try {
    await api.pages.add({
      title: "Teams",
      slug: "teams",
      html: `<div class="ps3-grid">${data.teams.map(t => 
        `<a class="ps3-card" href="/p/team-${t.id}/">${t.name}</a>`
      ).join("")}</div>`,
      status: "published"
    })
    console.log("Created Teams page")
  } catch(e) {
    console.log("Teams page may already exist")
  }
  
  for(const team of data.teams) {
    try {
      await api.pages.add({
        title: team.name,
        slug: `team-${team.id}`,
        html: `<h1>${team.name}</h1><p>Roster coming soon</p>`,
        status: "published"
      })
      console.log(`Created ${team.name} page`)
    } catch(e) {
      console.log(`${team.name} page may already exist`)
    }
  }
}

main()
