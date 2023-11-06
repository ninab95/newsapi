async function getTopHeadlinesNewsApi() {
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=56c687dac4804ef7bdb96b6527e0b239";

  const topHeadlinesResponse = await fetch(url);
  const topHeadlines = await topHeadlinesResponse.json();
  console.log(topHeadlines.articles);

  displayTopHeadlines(topHeadlines.articles);
}

function displayTopHeadlines(articles) {
  const headlineList = document.getElementById("hedlines");
  articles.forEach((article) => {
    const articleItem = document.createElement("div");
    articleItem.className = "article-item";
    headlineList.appendChild(articleItem);

    articleItem.innerHTML = `
            <img src=${article.urlToImage} />
            <h2>${article.title}</h2>
            <p>${article.author}</p>
            <span>${article.publishedAt}</span>
            <a class="button" href="${article.url}" target="_blank">Read article</a>
          `;

          
          articleItem.querySelector(".button").addEventListener("click", () => showArticleContent(article));

  });
}

function showArticleContent(article) {
    
    const articleContentTab = window.open("", "_blank");

    const contentHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${article.title}</title>
        <link rel="stylesheet" href="/article.css" />
    </head>
    <body>
        <div class="article-container">
            <img src="${article.urlToImage}" alt="Article Image">
            <div class="content-container">
                <p>${article.content}</p>
            </div>
        </div>
        <script src="your-external-js-file.js"></script>
    </body>
    </html>
  `;

  articleContentTab.document.write(contentHTML);

  articleContentTab.document.close();
}

getTopHeadlinesNewsApi();
