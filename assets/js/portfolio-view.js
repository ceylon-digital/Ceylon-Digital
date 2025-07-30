const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

fetch('projects.json')
   .then(res => res.json())
   .then(data => {
      const project = data.find(p => p.id === projectId);
      if (!project) {
         document.body.innerHTML = '<p style="text-align:center; color: red;">Project not found.</p>';
         return;
      }
      document.getElementById('projectIframe').src = project.iframeSrc;
      document.getElementById('projectTitle').textContent = project.title;
      document.getElementById('projectDescription').textContent = project.description;
      document.getElementById('projectClient').textContent = project.client;
   });

const iframe = document.getElementById('projectIframe');
const toggleBtn = document.getElementById('toggleViewBtn');
const exitFullViewBtn = document.getElementById('exitFullViewBtn');

let isFullView = false;

toggleBtn.addEventListener('click', () => {
   isFullView = true;
   iframe.classList.add('full-view');
   exitFullViewBtn.classList.add('show');
});

exitFullViewBtn.addEventListener('click', () => {
   isFullView = false;
   iframe.classList.remove('full-view');
   exitFullViewBtn.classList.remove('show');
});

// Sliders
const widthSlider = document.getElementById('widthSlider');
const heightSlider = document.getElementById('heightSlider');
const widthValue = document.getElementById('widthValue');
const heightValue = document.getElementById('heightValue');
const project_container = document.getElementById('project-container');

widthSlider.value = innerWidth;
heightSlider.value = innerHeight;

function updateIframeSize() {
   iframe.style.width = `${widthSlider.value}px`;
   iframe.style.height = `${heightSlider.value}px`;
   widthValue.textContent = widthSlider.value;
   heightValue.textContent = heightSlider.value;
}

widthSlider.addEventListener('input', updateIframeSize);
heightSlider.addEventListener('input', updateIframeSize);

// Initial setup
updateIframeSize();

// Window size display
const windowSizeDisplay = document.getElementById('windowSize');

function updateWindowSize() {
   windowSizeDisplay.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
}

window.addEventListener('resize', updateWindowSize);
updateWindowSize();