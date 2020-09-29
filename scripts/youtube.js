hexo.extend.tag.register('youtube', function(args){
  const channelId = args[0];
  const description = args[1] ? args[1] : "";
  return `<a href="https://www.youtube.com/channel/${channelId}/"><i class="fab fa-youtube"></i>${description}</a>`;
});
