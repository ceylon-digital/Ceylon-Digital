let allProjects = [];

function renderProjects(projects) {
      const container = document.getElementById('portfolioGrid');
      container.innerHTML = '';
      if (projects.length === 0) {
            container.innerHTML = `<p style="text-align:center; color: #6b7280;">No projects found.</p>`;
            return;
      }
      
      projects.forEach(project => {
            const card = document.createElement('a');
            card.href = project.detailsPage;
            card.className = 'portfolio-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
          <!-- <div class="iframe-container">
                  <iframe src="${project.iframeSrc}"></iframe>
               </div> -->
               <div class="thumbnail-container">
                  <img class="thumbnail" src="${project.thumbnailSrc}">
               </div>
               <div class="card-content">
                  <h3 class="project-title">${project.title}</h3>
                  <p class="project-description">${project.description}</p>
                  <div class="view-more-btn cta cta-primary">View Live Site <i class="fas fa-external-link-alt"></i></div>
               </div>
            `;
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