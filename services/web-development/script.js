function renderCards(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'pricing-card';

    card.innerHTML = `
      ${plan.badge ? `<span class="badge">${plan.badge}</span>` : ''}
      <h3>${plan.name}</h3>
      <p class="price">${plan.price}</p>
      <p class="description">${plan.description}</p>
      <ul class="features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    `;

    container.appendChild(card);
  });
}

fetch('pricing-data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load pricing data");
    }
    return response.json();
  })
  .then(data => {
    renderCards(data.development, 'development-cards');
    renderCards(data.maintenance, 'maintenance-cards');
  })
  .catch(error => {
    console.error("Error loading pricing data:", error);
  });
