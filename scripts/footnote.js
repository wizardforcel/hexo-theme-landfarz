let pages = {};

hexo.extend.filter.register('before_post_render', (data) => {
  data.content = data.content.replace(/{% footnote ([^{]*) %}/g, (origin, body) => {
    return `{% footnote ${body} ${data._id} %}`;
  });
  data.content = data.content.replace(/{% footnote_list %}/g, () => {
    return `{% footnote_list ${data._id} %}`;
  });
  pages[data._id] = {};
  pages[data._id].footnotes = [];
  pages[data._id].footnoteId = 0;
  return data;
});

hexo.extend.tag.register('footnote', (args, content) => {
  const title = args[0];
  const postId = args[1];
  if (!pages[postId]) {
    pages[postId] = {};
    pages[postId].footnotes = [];
    pages[postId].footnoteId = 0;
  }
  pages[postId].footnoteId++;
  pages[postId].footnotes.push({id: pages[postId].footnoteId, title: title});
  let text = title.replace(/\[(.+?)\]\(.+?\)/g, '$1');
  return `<sup class="footnote-ref"><a href=#fn${pages[postId].footnoteId} id="fnref${pages[postId].footnoteId}" title="${text}">${pages[postId].footnoteId}</a></sup>`;
}, { ends: false });

hexo.extend.tag.register('footnote_list', (args) => {
  const postId = args[0];
  return `\
  <hr class="footnotes-sep" />\n\
  <section class="footnotes">\n\
  <ol class="footnotes-list">\n\
  ${pages[postId].footnotes.map(footnote => {
    // リンクのみ対応
    let text = footnote.title.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    return `<li id="fn${footnote.id}" class="footnote-item">${text}<a href="#fnref${footnote.id}"> <span class="up-arrow"/></a></li>`;
  }).join('\n')}
  </ol>
  </section>`;
}, { ends: false });

