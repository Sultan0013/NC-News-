const db = require('../db/connection')

function fetchAllArticles (sort_by = "created_at" , order='desc'){

  const validColumns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'article_img_url'];
  const validOrders = ['asc', 'desc'];

  if (!validColumns.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: 'Invalid sort_by column' });
  }

  if (!validOrders.includes(order)) {
      return Promise.reject({ status: 400, msg: 'Invalid order value' });
  }
    return db.query(`
    SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.comment_id) ::int AS comment_count
    FROM 
      articles
    LEFT JOIN 
      comments ON articles.article_id = comments.article_id
    GROUP BY 
      articles.article_id
    ORDER BY 
     ${sort_by} ${order};
  `).then(({rows})=>{
    return rows
  })

  
}



module.exports = {fetchAllArticles}