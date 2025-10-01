cat > edc.js <<'EOF'
// /* ===== PART A: DATA & LOOKUPS ===== */

// Team code → display meta (name + colors)
const TEAM_META = {
  FDavies:  { name: "Fargo Davies Eagles",                primary:"#7a0019", secondary:"#f7b500" },
  WFHrce:   { name: "West Fargo Horace Hawks",            primary:"#0b5d1e", secondary:"#ffd166" },
  GFRR:     { name: "Grand Forks Red River Roughriders",  primary:"#7c0000", secondary:"#111111" },
  FNorth:   { name: "Fargo North Spartans",               primary:"#003366", secondary:"#f2c75c" },
  GFCent:   { name: "Grand Forks Central Knights",        primary:"#000000", secondary:"#c0a062" },
  FSouth:   { name: "Fargo South Bruins",                 primary:"#4a2c2a", secondary:"#f2d16b" },
  WFShy:    { name: "West Fargo Sheyenne Mustangs",       primary:"#002b36", secondary:"#8ecae6" },
  WFHigh:   { name: "West Fargo Packers",                 primary:"#0b5d1e", secondary:"#e5e5e5" },
  Shanley:  { name: "Shanley Deacons",                    primary:"#b30000", secondary:"#ffffff" }
};

// Map full team names in your teamsData → codes above
const TEAMNAME_TO_CODE = {
  "Fargo Davies": "FDavies",
  "West Fargo Horace": "WFHrce",
  "Grand Forks Red River": "GFRR",
  "Fargo North": "FNorth",
  "Grand Forks Central": "GFCent",
  "Fargo South": "FSouth",
  "West Fargo Sheyenne": "WFShy",
  "West Fargo": "WFHigh",
  "Shanley": "Shanley"
};

// Lookups that read your existing teamsData array
function getTeamByCode(code) {
  return teamsData.find(t => TEAMNAME_TO_CODE[t.name] === code);
}
function getPlayerByTeamNumber(teamCode, number) {
  const t = getTeamByCode(teamCode);
  if (!t) return null;
  return t.roster.find(p => String(p.number) === String(number));
}

// Leaders dataset (normalized from your message)
const leadersData = {
  scoring: [
    { team:"FDavies", num:3,  player:"Mason Klabo",        games:23, points:636, ppg:27.7 },
    { team:"WFHrce",  num:0,  player:"Carter Evanson",     games:24, points:605, ppg:25.2 },
    { team:"GFRR",    num:0,  player:"Pearce Parks",       games:26, points:605, ppg:23.3 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, points:521, ppg:20.0 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        games:26, points:481, ppg:18.5 },
    { team:"GFCent",  num:13, player:"Brooklan Bruce",     games:23, points:411, ppg:17.9 },
    { team:"FNorth",  num:11, player:"Matthew Sem",        games:26, points:453, ppg:17.4 },
    { team:"GFCent",  num:3,  player:"Brayden Delorme",    games:23, points:387, ppg:16.8 },
    { team:"WFHrce",  num:2,  player:"Brady Westphal",     games:24, points:403, ppg:16.8 },
    { team:"FSouth",  num:23, player:"Corbyn Follingstad", games:24, points:366, ppg:15.3 },
    { team:"WFShy",   num:1,  player:"Sullivan Ihry",      games:24, points:359, ppg:15.0 },
    { team:"FDavies", num:23, player:"Collin Williams",    games:27, points:391, ppg:14.5 },
    { team:"Shanley", num:3,  player:"Tommy Baumgartner",  games:21, points:302, ppg:14.4 },
    { team:"WFHigh",  num:2,  player:"Aiden Samek",        games:26, points:368, ppg:14.2 },
    { team:"WFHigh",  num:4,  player:"Bonfas Loria",       games:25, points:351, ppg:14.0 }
  ],
  rebounding: [
    { team:"WFHrce",  num:23, player:"Brett Livingston",   games:24, rebounds:219, rpg:9.1 },
    { team:"GFRR",    num:10, player:"Matt Dosch",         games:26, rebounds:234, rpg:9.0 },
    { team:"FDavies", num:23, player:"Collin Williams",    games:27, rebounds:242, rpg:9.0 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, rebounds:226, rpg:8.7 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        games:23, rebounds:181, rpg:7.9 },
    { team:"FSouth",  num:23, player:"Corbyn Follingstad", games:24, rebounds:185, rpg:7.7 },
    { team:"FNorth",  num:22, player:"Aden Nojang",        games:27, rebounds:202, rpg:7.5 },
    { team:"WFShy",   num:11, player:"Kayson Bernstein",   games:23, rebounds:172, rpg:7.5 },
    { team:"FNorth",  num:3,  player:"Trey Knoke",         games:26, rebounds:180, rpg:6.9 },
    { team:"WFHigh",  num:15, player:"Alex Wetterlin",     games:27, rebounds:182, rpg:6.7 },
    { team:"GFRR",    num:0,  player:"Pearce Parks",       games:26, rebounds:175, rpg:6.7 },
    { team:"Shanley", num:3,  player:"Tommy Baumgartner",  games:21, rebounds:140, rpg:6.7 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        games:26, rebounds:167, rpg:6.4 },
    { team:"FDavies", num:32, player:"Colton Reinke",      games:26, rebounds:166, rpg:6.4 },
    { team:"WFShy",   num:5,  player:"Kyson Keller",       games:23, rebounds:145, rpg:6.3 }
  ],
  assists: [
    { team:"FDavies", num:3,  player:"Mason Klabo",        games:23, assists:136, apg:5.9 },
    { team:"WFHrce",  num:0,  player:"Carter Evanson",     games:24, assists:118, apg:4.9 },
    { team:"WFHrce",  num:1,  player:"Aiden Green",        games:24, assists:104, apg:4.3 },
    { team:"GFRR",    num:0,  player:"Pearce Parks",       games:26, assists:101, apg:3.9 },
    { team:"GFCent",  num:5,  player:"Cole Wilber",        games:23, assists:86,  apg:3.7 },
    { team:"WFHigh",  num:11, player:"Beckett Pfau",       games:26, assists:97,  apg:3.7 },
    { team:"Shanley", num:2,  player:"Jake Kraft",         games:18, assists:65,  apg:3.6 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, assists:91,  apg:3.5 },
    { team:"WFShy",   num:1,  player:"Sullivan Ihry",      games:24, assists:81,  apg:3.4 },
    { team:"FSouth",  num:4,  player:"Aliyu Shahid",       games:24, assists:76,  apg:3.2 },
    { team:"WFHrce",  num:2,  player:"Brady Westphal",     games:24, assists:76,  apg:3.2 },
    { team:"FNorth",  num:5,  player:"Victor Busanga",     games:27, assists:83,  apg:3.1 },
    { team:"GFRR",    num:14, player:"James Schindler",    games:25, assists:76,  apg:3.0 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        games:26, assists:73,  apg:2.8 },
    { team:"FNorth",  num:11, player:"Matthew Sem",        games:26, assists:70,  apg:2.7 }
  ],
  offensiveRebounding: [
    { team:"FDavies", num:23, player:"Collin Williams",    games:27, offReb:97,  orpg:3.6 },
    { team:"GFRR",    num:10, player:"Matt Dosch",         games:26, offReb:88,  orpg:3.4 },
    { team:"FNorth",  num:22, player:"Aden Nojang",        games:27, offReb:91,  orpg:3.4 },
    { team:"WFShy",   num:11, player:"Kayson Bernstein",   games:23, offReb:70,  orpg:3.0 },
    { team:"FNorth",  num:3,  player:"Trey Knoke",         games:26, offReb:78,  orpg:3.0 },
    { team:"FSouth",  num:23, player:"Corbyn Follingstad", games:24, offReb:61,  orpg:2.5 },
    { team:"WFHigh",  num:4,  player:"Bonfas Loria",       games:25, offReb:61,  orpg:2.4 },
    { team:"FSouth",  num:21, player:"Abakar Minganoudji", games:20, offReb:48,  orpg:2.4 },
    { team:"WFHrce",  num:23, player:"Brett Livingston",   games:24, offReb:57,  orpg:2.4 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, offReb:60,  orpg:2.3 },
    { team:"FDavies", num:40, player:"Holden Witte",       games:27, offReb:59,  orpg:2.2 },
    { team:"FDavies", num:32, player:"Colton Reinke",      games:26, offReb:52,  orpg:2.0 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        games:26, offReb:49,  orpg:1.9 },
    { team:"WFShy",   num:5,  player:"Kyson Keller",       games:23, offReb:41,  orpg:1.8 },
    { team:"WFShy",   num:24, player:"Tanner Kratcha",     games:22, offReb:39,  orpg:1.8 }
  ],
  ftPct_min42Att: [
    { team:"GFCent",  num:3,  player:"Brayden Delorme",    made:53,  att:59,  pct:89.8 },
    { team:"WFHigh",  num:2,  player:"Aiden Samek",        made:82,  att:95,  pct:86.3 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        made:122, att:144, pct:84.7 },
    { team:"WFHrce",  num:1,  player:"Aiden Green",        made:61,  att:73,  pct:83.6 },
    { team:"Shanley", num:3,  player:"Tommy Baumgartner",  made:73,  att:88,  pct:83.0 },
    { team:"GFRR",    num:14, player:"James Schindler",    made:94,  att:114, pct:82.5 },
    { team:"GFCent",  num:13, player:"Brooklan Bruce",     made:77,  att:94,  pct:81.9 },
    { team:"WFHrce",  num:23, player:"Brett Livingston",   made:39,  att:48,  pct:81.3 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        made:73,  att:94,  pct:77.7 },
    { team:"FNorth",  num:11, player:"Matthew Sem",        made:81,  att:107, pct:75.7 }
  ],
  fgPct_min84Att: [
    { team:"FSouth",  num:23, player:"Corbyn Follingstad", made:154, att:259, pct:59.5 },
    { team:"WFHrce",  num:23, player:"Brett Livingston",   made:78,  att:132, pct:59.1 },
    { team:"WFShy",   num:11, player:"Kayson Bernstein",   made:101, att:173, pct:58.4 },
    { team:"FNorth",  num:3,  player:"Trey Knoke",         made:149, att:264, pct:56.4 },
    { team:"FDavies", num:23, player:"Collin Williams",    made:168, att:302, pct:55.6 },
    { team:"GFRR",    num:40, player:"James Walters",      made:46,  att:86,  pct:53.5 },
    { team:"FDavies", num:40, player:"Holden Witte",       made:57,  att:107, pct:53.3 },
    { team:"WFHigh",  num:15, player:"Alex Wetterlin",     made:93,  att:177, pct:52.5 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   made:208, att:400, pct:52.0 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        made:219, att:426, pct:51.4 }
  ],
  steals: [
    { team:"WFHrce",  num:0,  player:"Carter Evanson",     games:24, steals:82, spg:3.4 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        games:23, steals:63, spg:2.7 },
    { team:"FNorth",  num:11, player:"Matthew Sem",        games:26, steals:62, spg:2.4 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, steals:60, spg:2.3 },
    { team:"GFRR",    num:14, player:"James Schindler",    games:25, steals:50, spg:2.0 },
    { team:"Shanley", num:0,  player:"Carson Busek",       games:22, steals:38, spg:1.7 },
    { team:"FSouth",  num:21, player:"Abakar Minganoudji", games:20, steals:34, spg:1.7 },
    { team:"GFRR",    num:0,  player:"Pearce Parks",       games:26, steals:44, spg:1.7 },
    { team:"WFShy",   num:1,  player:"Sullivan Ihry",      games:24, steals:40, spg:1.7 },
    { team:"GFCent",  num:3,  player:"Brayden Delorme",    games:23, steals:37, spg:1.6 }
  ],
  blocks: [
    { team:"WFHrce",  num:23, player:"Brett Livingston",   games:24, blocks:38, bpg:1.6 },
    { team:"WFHrce",  num:11, player:"Owen Terras",        games:24, blocks:25, bpg:1.0 },
    { team:"FSouth",  num:21, player:"Abakar Minganoudji", games:20, blocks:15, bpg:0.8 },
    { team:"GFRR",    num:3,  player:"Cameron Klefstad",   games:26, blocks:18, bpg:0.7 },
    { team:"FDavies", num:32, player:"Colton Reinke",      games:26, blocks:15, bpg:0.6 },
    { team:"WFShy",   num:24, player:"Tanner Kratcha",     games:22, blocks:11, bpg:0.5 },
    { team:"WFHigh",  num:3,  player:"Haakon Seymour",     games:27, blocks:13, bpg:0.5 },
    { team:"WFHigh",  num:15, player:"Alex Wetterlin",     games:27, blocks:13, bpg:0.5 },
    { team:"WFHigh",  num:33, player:"Ryker Bergee",       games:17, blocks:8,  bpg:0.5 },
    { team:"GFRR",    num:10, player:"Matt Dosch",         games:26, blocks:12, bpg:0.5 },
    { team:"FNorth",  num:3,  player:"Trey Knoke",         games:26, blocks:12, bpg:0.5 }
  ],
  threePtPct_min42Att: [
    { team:"WFHrce",  num:13, player:"Kaiden Peterson",    made:32, att:58,  pct:55.2 },
    { team:"WFHrce",  num:2,  player:"Brady Westphal",     made:90, att:176, pct:51.1 },
    { team:"WFHrce",  num:1,  player:"Aiden Green",        made:24, att:50,  pct:48.0 },
    { team:"GFCent",  num:21, player:"DJ Perrault",        made:36, att:86,  pct:41.9 },
    { team:"WFHigh",  num:2,  player:"Aiden Samek",        made:60, att:148, pct:40.5 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        made:76, att:190, pct:40.0 },
    { team:"WFHrce",  num:11, player:"Owen Terras",        made:35, att:88,  pct:39.8 },
    { team:"GFRR",    num:2,  player:"Reese Walters",      made:22, att:56,  pct:39.3 },
    { team:"WFShy",   num:21, player:"CJ Smith",           made:22, att:57,  pct:38.6 },
    { team:"GFCent",  num:3,  player:"Brayden Delorme",    made:80, att:210, pct:38.1 }
  ],
  threePtMade: [
    { team:"WFHrce",  num:2,  player:"Brady Westphal",     games:24, threes:90, tpg:3.75 },
    { team:"GFCent",  num:3,  player:"Brayden Delorme",    games:23, threes:80, tpg:3.48 },
    { team:"FDavies", num:3,  player:"Mason Klabo",        games:23, threes:76, tpg:3.30 },
    { team:"FSouth",  num:10, player:"Michael Hamilton",   games:22, threes:63, tpg:2.86 },
    { team:"WFHrce",  num:0,  player:"Carter Evanson",     games:24, threes:66, tpg:2.75 },
    { team:"Shanley", num:0,  player:"Carson Busek",       games:22, threes:58, tpg:2.64 },
    { team:"FNorth",  num:14, player:"Eric DeBoer",        games:26, threes:64, tpg:2.46 },
    { team:"GFCent",  num:13, player:"Brooklan Bruce",     games:23, threes:54, tpg:2.35 },
    { team:"WFHigh",  num:2,  player:"Aiden Samek",        games:26, threes:60, tpg:2.31 },
    { team:"GFRR",    num:14, player:"James Schindler",    games:25, threes:53, tpg:2.12 }
  ],
  meta: { lastUpdated: "2025-09-26", note: "To qualify: ≥ half of team games." }
};

// /* ===== PART B: TEAMS / ROSTER / PLAYER CARD ===== */

// DOM hooks that already exist in your HTML
const teamsGrid        = document.getElementById('teams-grid');
const teamsSection     = document.getElementById('teams-section');
const rosterView       = document.getElementById('roster-view');
const rosterTeamName   = document.getElementById('roster-team-name');
const rosterTeamInfo   = document.getElementById('roster-team-info');
const rosterTbody      = document.getElementById('roster-tbody');
const playerStatsView  = document.getElementById('player-stats-view');
const playerNameLarge  = document.getElementById('player-name-large');
const playerDetails    = document.getElementById('player-details');
const playerStatsGrid  = document.getElementById('player-stats-grid');

// Tab buttons
const teamsTabBtn      = document.getElementById('teams-tab');
const standingsTabBtn  = document.getElementById('standings-tab');
const leadersTabBtn    = document.getElementById('leaders-tab');

// Render teams grid from TEAM_META + teamsData
function renderTeamsGrid() {
  teamsGrid.innerHTML = '';
  Object.keys(TEAM_META).forEach(code => {
    const t = getTeamByCode(code);
    if (!t) return;
    const card = document.createElement('div');
    card.className = 'team-card';
    card.style.borderColor = TEAM_META[code].primary;
    card.innerHTML = `
      <div class="team-name">${TEAM_META[code].name}</div>
      <div class="team-info">${t.mascot} • Coach: ${t.coach}</div>
      <div class="team-info">EDC: ${t.edcRecord} • Overall: ${t.overallRecord}</div>
    `;
    card.addEventListener('click', () => showRoster(code));
    teamsGrid.appendChild(card);
  });
}

// Roster screen
function showRoster(teamCode) {
  const t = getTeamByCode(teamCode);
  if (!t) return;

  // Show roster view, hide others
  document.querySelectorAll('.tab-section').forEach(s=>s.style.display='none');
  rosterView.style.display = 'block';
  playerStatsView.style.display = 'none';
  document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));
  teamsTabBtn.classList.add('active');

  rosterTeamName.textContent = TEAM_META[teamCode].name;
  rosterTeamInfo.textContent = `${t.mascot} • Coach: ${t.coach} • EDC: ${t.edcRecord} • Overall: ${t.overallRecord}`;

  rosterTbody.innerHTML = '';
  t.roster.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="player-number">${p.number}</span></td>
      <td>${p.name}${p.isCaptain ? ' <span class="captain-badge">C</span>' : ''}</td>
      <td>${p.position ?? ''}</td>
      <td>${p.height ?? ''}</td>
      <td>${p.year ?? ''}</td>
      <td>${p.ppg ?? 0}</td>
      <td>${p.rpg ?? 0}</td>
      <td>${p.apg ?? 0}</td>
    `;
    tr.addEventListener('click', () => showPlayer(teamCode, p.number));
    rosterTbody.appendChild(tr);
  });
}

function backToTeams() {
  rosterView.style.display = 'none';
  playerStatsView.style.display = 'none';
  teamsSection.style.display = 'block';
  document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));
  teamsTabBtn.classList.add('active');
}
window.backToTeams = backToTeams; // keep your existing onclick

// Player card
function statBox(label, value) {
  const div = document.createElement('div');
  div.className = 'stat-box';
  div.innerHTML = `<div class="stat-value">${value}</div><div class="stat-label">${label}</div>`;
  return div;
}

// Pull leaderboard notes for a player by name
function getLeaderNotes(playerName) {
  const notes = [];
  const sections = [
    ['Scoring',    leadersData.scoring,             r=>r.ppg, 'PPG'],
    ['Rebounds',   leadersData.rebounding,          r=>r.rpg, 'RPG'],
    ['Assists',    leadersData.assists,             r=>r.apg, 'APG'],
    ['Steals',     leadersData.steals,              r=>r.spg, 'SPG'],
    ['Blocks',     leadersData.blocks,              r=>r.bpg, 'BPG'],
    ['FG%',        leadersData.fgPct_min84Att,      r=>r.pct, 'FG%'],
    ['FT%',        leadersData.ftPct_min42Att,      r=>r.pct, 'FT%'],
    ['3PT%',       leadersData.threePtPct_min42Att, r=>r.pct, '3PT%'],
    ['3PM/G',      leadersData.threePtMade,         r=>r.tpg, '3PM/G'],
    ['O-RPG',      leadersData.offensiveRebounding, r=>r.orpg,'O-RPG']
  ];
  sections.forEach(([title, arr, val, unit]) => {
    const idx = arr.findIndex(x => x.player === playerName);
    if (idx !== -1) {
      const rank = idx + 1;
      const v = val(arr[idx]);
      notes.push(`${title}: #${rank} ${typeof v === 'number' ? v.toFixed(2) : v} ${unit}`);
    }
  });
  return notes;
}

function showPlayer(teamCode, number) {
  const t = getTeamByCode(teamCode);
  const p = getPlayerByTeamNumber(teamCode, number);
  if (!t || !p) return;

  rosterView.style.display = 'none';
  playerStatsView.style.display = 'block';

  // Themed header
  const pc = document.querySelector('.player-profile');
  pc.style.background = `linear-gradient(135deg, ${TEAM_META[teamCode].primary}, ${TEAM_META[teamCode].secondary})`;

  playerNameLarge.textContent = p.name;
  playerDetails.innerHTML = `
    <div>Team: <strong>${TEAM_META[teamCode].name}</strong></div>
    <div>Jersey: <strong>${p.number}</strong></div>
    <div>Pos: <strong>${p.position ?? ''}</strong></div>
    <div>Height: <strong>${p.height ?? ''}</strong></div>
    <div>Year: <strong>${p.year ?? ''}</strong></div>
    ${p.isCaptain ? '<div><span class="captain-badge">Captain</span></div>' : ''}
  `;

  // Stats
  playerStatsGrid.innerHTML = '';
  const statPairs = [
    ['Games', p.games ?? 0],
    ['PPG',   p.ppg ?? 0],
    ['RPG',   p.rpg ?? 0],
    ['APG',   p.apg ?? 0],
    ['SPG',   p.spg ?? 0],
    ['BPG',   p.bpg ?? 0],
    ['FG%',   p.fgp != null ? `${Number(p.fgp).toFixed(1)}%` : '—'],
    ['FT%',   p.ftp != null ? `${Number(p.ftp).toFixed(1)}%` : '—'],
    ['3PT%',  p.tpp != null ? `${Number(p.tpp).toFixed(1)}%` : '—']
  ];
  statPairs.forEach(([k,v]) => playerStatsGrid.appendChild(statBox(k, v)));

  // Leaderboard highlights
  const notes = getLeaderNotes(p.name);
  if (notes.length) {
    const noteBox = document.createElement('div');
    noteBox.className = 'stat-box';
    noteBox.style.gridColumn = '1 / -1';
    noteBox.innerHTML = `<div class="stat-value" style="font-size:1.05rem">${notes.join(' • ')}</div><div class="stat-label">Conference Leaderboard Highlights</div>`;
    playerStatsGrid.appendChild(noteBox);
  }
}

function backToRoster() {
  playerStatsView.style.display = 'none';
  rosterView.style.display = 'block';
}
window.backToRoster = backToRoster;

// /* ===== PART C: LEADERS + TABS ===== */

// small helpers reused by leaders
function section(title) {
  const wrap = document.createElement('div');
  wrap.style.marginBottom = '30px';
  const h = document.createElement('h3');
  h.textContent = title;
  h.style.color = 'var(--primary-color)';
  h.style.margin = '20px 0 10px';
  wrap.appendChild(h);
  return wrap;
}
function tableFrom(items, columns, onRowClick) {
  const tbl = document.createElement('table');
  tbl.className = 'roster-table';
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  columns.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c.label;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  tbl.appendChild(thead);

  const tbody = document.createElement('tbody');
  items.forEach(row => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    columns.forEach(c => {
      const td = document.createElement('td');
      if (c.value === 'team') {
        td.textContent = TEAM_META[row.team]?.name || row.team;
      } else {
        td.textContent = typeof c.value === 'function' ? c.value(row) : row[c.value];
      }
      tr.appendChild(td);
    });
    if (onRowClick) tr.addEventListener('click', () => onRowClick(row));
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  return tbl;
}

const leadersSection = document.getElementById('leaders-section');

function renderLeaders() {
  leadersSection.innerHTML = '';

  const blocks = [
    { title: 'Scoring Leaders (PPG)', data: leadersData.scoring, cols: [
      { label:'#', 'value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'PTS','value':'points' }, { label:'PPG','value':r=>r.ppg.toFixed(1) }
    ]},
    { title: 'Rebounding (RPG)', data: leadersData.rebounding, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'REB','value':'rebounds' }, { label:'RPG','value':r=>r.rpg.toFixed(1) }
    ]},
    { title: 'Assists (APG)', data: leadersData.assists, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'AST','value':'assists' }, { label:'APG','value':r=>r.apg.toFixed(1) }
    ]},
    { title: 'Offensive Rebounding (O-RPG)', data: leadersData.offensiveRebounding, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'O-REB','value':'offReb' }, { label:'O-RPG','value':r=>r.orpg.toFixed(1) }
    ]},
    { title: 'FT% (min 42 att)', data: leadersData.ftPct_min42Att, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'M-A','value':r=>`${r.made}-${r.att}` }, { label:'FT%','value':r=>r.pct.toFixed(1)+'%' }
    ]},
    { title: 'FG% (min 84 att)', data: leadersData.fgPct_min84Att, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'M-A','value':r=>`${r.made}-${r.att}` }, { label:'FG%','value':r=>r.pct.toFixed(1)+'%' }
    ]},
    { title: 'Steals (SPG)', data: leadersData.steals, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'STL','value':'steals' }, { label:'SPG','value':r=>r.spg.toFixed(1) }
    ]},
    { title: 'Blocks (BPG)', data: leadersData.blocks, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'BLK','value':'blocks' }, { label:'BPG','value':r=>r.bpg.toFixed(1) }
    ]},
    { title: '3PT% (min 42 att)', data: leadersData.threePtPct_min42Att, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'M-A','value':r=>`${r.made}-${r.att}` }, { label:'3PT%','value':r=>r.pct.toFixed(1)+'%' }
    ]},
    { title: '3PT Made', data: leadersData.threePtMade, cols: [
      { label:'#','value':'num' }, { label:'Player','value':'player' }, { label:'Team','value':'team' },
      { label:'G','value':'games' }, { label:'3PM','value':'threes' }, { label:'3PM/G','value':r=>r.tpg.toFixed(2) }
    ]}
  ];

  const hdr = document.createElement('div');
  hdr.className = 'subtitle';
  hdr.innerHTML = `EDC Boys' Basketball Individual Statistics — Final<br><small>Last Updated: ${leadersData.meta.lastUpdated}</small>`;
  hdr.style.marginBottom = '16px';
  leadersSection.appendChild(hdr);

  blocks.forEach(b => {
    if (!b.data || !b.data.length) return;
    const wrap = section(b.title);
    wrap.appendChild(
      tableFrom(b.data, b.cols, (row) => { showRoster(row.team); showPlayer(row.team, row.num); })
    );
    leadersSection.appendChild(wrap);
  });
}

// Tabs: show correct section and render as needed
function activateTab(tab) {
  document.querySelectorAll('.tab-section').forEach(s=>s.style.display='none');
  document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));

  if (tab === 'teams') {
    teamsSection.style.display = 'block';
    teamsTabBtn.classList.add('active');
  } else if (tab === 'standings') {
    document.getElementById('standings-section').style.display = 'block';
    standingsTabBtn.classList.add('active');
  } else if (tab === 'leaders') {
    leadersSection.style.display = 'block';
    leadersTabBtn.classList.add('active');
    renderLeaders();
  }
}

// Hook up buttons
teamsTabBtn.addEventListener('click', () => activateTab('teams'));
standingsTabBtn.addEventListener('click', () => activateTab('standings'));
leadersTabBtn.addEventListener('click', () => activateTab('leaders'));

// Initial render
renderTeamsGrid();
activateTab('teams');

EOF
