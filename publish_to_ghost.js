import fs from "fs"
import GhostAdminAPI from "@tryghost/admin-api"

const api = new GhostAdminAPI({
  url: process.env.GHOST_ADMIN_API_URL,
  key: process.env.GHOST_ADMIN_API_KEY,
  version: "v5.0"
})

function esc(s=""){ return String(s).replaceAll("<","&lt;").replaceAll(">","&gt;") }
function h1(t){ return `<h1 class="ps3-title">${esc(t)}</h1>` }
function wrap(body){ return `<section class="ps3-wrap">${body}</section>` }

async function upsertPage({title, slug, html, tags=[]}){
  const found = await api.pages.browse({filter:`slug:${slug}`, limit:1}).catch(()=>[])
  if (found && found.length){
    const page = found[0]
    return api.pages.edit({id: page.id, updated_at: page.updated_at, title, slug, html, tags})
  }
  return api.pages.add({title, slug, html, tags})
}

function teamCard(t){ return `<a class="ps3-card" href="/team/${esc(t.id)}"><span>${esc(t.name)}</span></a>` }
function playerLink(p){ return `<a class="ps3-chip" href="/player/${esc(p.id)}">${esc(p.name)}</a>` }

function teamTableRow(g, tid){
  const vs = g.home_team_id===tid ? `vs ${esc(g.away_team_id)}` : `@ ${esc(g.home_team_id)}`
  const score = (g.home_score!=null && g.away_score!=null) ? `${g.home_score}-${g.away_score}` : "—"
  return `<tr><td>${esc(g.date||"")}</td><td>${vs}</td><td>${score}</td></tr>`
}

function playerMiniStats(p){
  const s = p.stats||{}
  const pairs = Object.entries(s).map(([k,v])=>`<div class="ps3-stat"><b>${esc(k)}</b> ${esc(v)}</div>`).join("")
  return `<div class="ps3-statrow">${pairs||"<i>No stats yet</i>"}</div>`
}

async function main(){
  const jsonPath = process.argv[2]
  if (!jsonPath) { console.error("Usage: node publish_to_ghost.js <path/to/edc_data.json>"); process.exit(1) }
  const raw = fs.readFileSync(jsonPath, "utf8")
  const data = JSON.parse(raw)
  const season = data.season || "2024-2025"

  await upsertPage({ title:"Teams", slug:"teams",
    html: wrap(h1(`Teams (${season})`) + `<div class="ps3-grid">${
      (data.teams||[]).map(teamCard).join("")
    }</div>`),
    tags:["nav:teams"] })

  for (const t of data.teams||[]){
    const players = (data.players||[]).filter(p=>p.team_id===t.id)
    const games = (data.games||[]).filter(g=>g.home_team_id===t.id || g.away_team_id===t.id)
    const roster = players.map(p=>`<li>${playerLink(p)} ${p.position?`<span class="ps3-sub">(${esc(p.position)})</span>`:""}</li>`).join("") || "<li>No roster yet</li>"
    const html = wrap(`${h1(esc(t.name))}
      <h3>Roster</h3>
      <ul class="ps3-list">${roster}</ul>`)
    await upsertPage({ title:t.name, slug:`team/${t.id}`, html, tags:[`team:${t.id}`]})
  }

  console.log("✅ Publish complete.")
}
main().catch(e=>{ console.error(e); process.exit(1) })
