hexo.extend.tag.register('twitter', function(args){
  const twitterId = args[0];
  const description = args[1] ? args[1] : "";
  return `<a href="https://twitter.com/${twitterId}/"><i class="fab fa-twitter"></i>${description}</a>`;
});