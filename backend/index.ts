import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';


const app = express();
const PORT = 3000;

app.use(cors());

async function scrapeAmazon(keyword: string) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
	);

	const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
	await page.goto(url, { waitUntil: 'domcontentloaded' });

	const results = await page.evaluate(() => {
		const items = Array.from(
			document.querySelectorAll('[data-component-type="s-search-result"]')
		);

		return items.map((item) => {
			const title =
				item.querySelector('h2 a span')?.textContent?.trim() ??
				'No title';
			const rating =
				item.querySelector('.a-icon-alt')?.textContent?.trim() ??
				'No rating';
			const reviewCount =
				item
					.querySelector('.a-size-base.s-underline-text')
					?.textContent?.trim() ?? 'No reviews';
			const image = item.querySelector('img')?.getAttribute('src') ?? '';

			return { title, rating, reviewCount, image };
		});
	});

	await browser.close();
	return results;
}

app.get('/api/scrape', async (req, res) => {
	const keyword = req.query.keyword as string;

	if (!keyword) {
		return res
			.status(400)
			.json({ error: 'Missing keyword query parameter.' });
	}

	try {
		const data = await scrapeAmazon(keyword);
		res.json({ keyword, results: data });
	} catch (error) {
		console.error('Error scraping Amazon:', error);
		res.status(500).json({
			error: 'Failed to scrape Amazon',
			details: error instanceof Error ? error.message : String(error),
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
