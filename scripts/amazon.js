hexo.extend.tag.register('amazon', (args, content) => {
  const url = args[0];
  const thumbnail = args[1];
  const title = args[2];
  const publishedDate = args[3];
  return `
  <div class="amazon">
    <div class="amazon-inline">
      <div class="amazon-image">
        <a href="${url}" target="_blank">
          <img src="${thumbnail}" alt="${title}" border="0" />
        </a>
      </div>
      <div class="amazon-text">
        <div class="amazon-title">
          <a href="${url}" target="_blank">${title}</a>
        </div>
        <div>発売日: ${publishedDate}<br /></div>
        <div class="amazon-link">
          <a href="${url}" target="_blank">Amazon.co.jpで詳細を見る</a>
        </div>
      </div>
      <div style="clear: left"></div>
    </div>
  </div>`;
}, {ends: false});
