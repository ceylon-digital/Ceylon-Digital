let allProjects = [];

function renderProjects(projects) {
      const container = document.getElementById('portfolioGrid');
      container.innerHTML = '';
      if (projects.length === 0) {
            container.innerHTML = `<p style="text-align:center; color: #6b7280;">No projects found.</p>`;
            return;
      }
      
      projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `<div class="portfolio-card">
                  <img src="${project.thumbnailSrc}" alt="Project 1" class="project-image" />
                  <div class="card-content">
                     <h3>${project.title}</h3>
                     <p>${project.description}</p>
                     <ul class="tags">
                        <li>React</li>
                        <li>Node.js</li>
                        <li>UI/UX</li>
                     </ul>
                     <a href="${project.detailsPage}" class="view-case">View case study <i class="fas fa-arrow-right"></i></a>
                  </div>
               </div>`;
            container.appendChild(card);
      });
}

function applyFilters() {
      const selectedType = document.querySelector('.filter-btn.active')?.getAttribute('data-type') || 'All';
      const searchText = document.getElementById('searchInput').value.toLowerCase();
      
      let filtered = allProjects;
      
      if (selectedType !== 'All') {
            filtered = filtered.filter(p => p.type === selectedType);
      }
      
      if (searchText) {
            filtered = filtered.filter(p =>
                  p.title.toLowerCase().includes(searchText) ||
                  p.description.toLowerCase().includes(searchText) ||
                  p.client.toLowerCase().includes(searchText)
            );
      }
      
      renderProjects(filtered);
}

function setFilterFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const type = urlParams.get('type');
      if (type) {
            const btn = [...document.querySelectorAll('.filter-btn')].find(b => b.dataset.type === type);
            if (btn) {
                  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                  btn.classList.add('active');
                  applyFilters();
            }
      }
}

fetch('projects.json')
      .then(res => res.json())
      .then(data => {
            allProjects = data;
            renderProjects(allProjects);
            setFilterFromURL();
      });

document.getElementById('filterBar').addEventListener('click', e => {
      if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            applyFilters();
      }
});

document.getElementById('searchInput').addEventListener('input', applyFilters);