document.getElementById('scrapeBtn').addEventListener('click', async () => {
	const keyword = document.getElementById('keyword').value.trim();
	const resultsContainer = document.getElementById('results');
	resultsContainer.innerHTML = '';

	if (!keyword) {
		alert('Please enter a keyword.');
		return;
	}

	try {
		const res = await fetch(
			`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(
				keyword
			)}`
		);
		const data = await res.json();

		if (data.results?.length) {
			data.results.forEach((item) => {
				const div = document.createElement('div');
				div.className = 'product';
				div.innerHTML = `
          <h3>${item.title}</h3>
          <p>Rating: ${item.rating}</p>
          <p>Reviews: ${item.reviewCount}</p>
          <img src="${item.image}" width="100" />
        `;
				resultsContainer.appendChild(div);
			});
		} else {
			resultsContainer.innerHTML = '<p>No products found.</p>';
		}
	} catch (err) {
		resultsContainer.innerHTML = '<p>Error fetching data.</p>';
		console.error(err);
	}
});
