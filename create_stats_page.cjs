const GhostAdminAPI = require('@tryghost/admin-api');

const api = new GhostAdminAPI({
  url: 'http://prairiescore.com',
  key: '68dc83864e603633b9a27444:fa975d1872f4f2408653ed7c7c8225d29dbe6825b9aad0f3346954b6ab4647b3',
  version: 'v5.0'
});

// Read your edc.js file
const fs = require('fs');
const edcJS = fs.readFileSync('./edc.js', 'utf8');

const htmlContent = `
<div class="nav" style="display:flex;gap:10px;margin:20px 0;border-bottom:2px solid #333;">
  <button class="nav-tab active" id="teamsTabBtn" style="padding:12px 24px;cursor:pointer;background:#333;color:#fff;border:none;">Teams</button>
  <button class="nav-tab" id="standingsTabBtn" style="padding:12px 24px;cursor:pointer;background:#fff;border:none;">Standings</button>
  <button class="nav-tab" id="leadersTabBtn" style="padding:12px 24px;cursor:pointer;background:#fff;border:none;">Leaders</button>
</div>

<div id="teams-section" class="tab-section"></div>
<div id="standings-section" class="tab-section"></div>
<div id="leaders-section" class="tab-section"></div>

<style>
.nav-tab{font-size:16px;font-weight:bold;cursor:pointer;}
.nav-tab:hover{background:#555;color:#fff;}
.nav-tab.active{background:#333;color:#fff;}
.tab-section{display:none;}
table{width:100%;border-collapse:collapse;background:white;margin:20px 0;}
th,td{padding:10px;text-align:left;border-bottom:1px solid #ddd;}
th{background:#333;color:white;}
tr:hover{background:#f0f0f0;cursor:pointer;}
</style>

<script>
${edcJS}
</script>
`;

api.pages.add({
  title: 'EDC Stats',
  html: htmlContent,
  status: 'published'
})
.then(response => {
  console.log('✅ Stats page created!');
  console.log('Full response:', JSON.stringify(response, null, 2));
  if (response.slug) {
    console.log('Visit: http://prairiescore.com/' + response.slug);
  } else {
    console.log('Visit: http://prairiescore.com/ghost/#/pages');
  }
})
