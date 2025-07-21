document.addEventListener("DOMContentLoaded",function(){let a=document.getElementById("searchInput");var e,t=document.getElementById("searchButton");let r=document.getElementById("searchResults"),n=null;e=(e="q").replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");let s=null===(e=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search))?"":decodeURIComponent(e[1].replace(/\+/g," "));function i(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g,"").trim()}function c(){var e=i(a.value);if(e&&n){var t=new URL(window.location.href);t.searchParams.set("q",e),window.history.pushState({},"",t);let d=[],o=e.split(/\s+/);n.forEach(([e,t,a,r])=>{let n=0,s=new Set,c=(Object.entries(r).forEach(([e,t])=>{let a=t.split("|");o.forEach(t=>{a.some(e=>e.includes(t))&&(n+=parseInt(e),s.add(t))})}),i(t));o.forEach(e=>{c.includes(e)&&(n+=10,s.add(e))}),0<s.size&&(r=20*(s.size-1),d.push({url:e,title:t,image:a,score:n+r,matchedWords:Array.from(s)}))}),d.sort((e,t)=>t.score-e.score),0===(t=d).length?r.innerHTML='<div class="alert alert-info">Nenhum resultado encontrado</div>':(t=t.map(e=>`
        <div class="card mb-3">
            <div class="row g-0">
                ${e.image?`
                <div class="col-md-4">
                    <img src="${e.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${e.title}">
                </div>
                `:""}
                <div class="col-md-${e.image?"8":"12"}">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="${e.url}" class="text-decoration-none">${e.title}</a>
                        </h5>
                        <p class="card-text text-muted">
                            Palavras encontradas: ${e.matchedWords.join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `).join(""),r.innerHTML=t)}}s&&(a.value=s,setTimeout(()=>c(),100)),fetch("/search-index.json").then(e=>e.json()).then(e=>{n=e,s&&c()}).catch(e=>{console.error("Erro ao carregar índice de pesquisa:",e),r.innerHTML='<div class="alert alert-danger">Erro ao carregar índice de pesquisa</div>'}),t.addEventListener("click",c),a.addEventListener("keypress",function(e){"Enter"===e.key&&c()})});