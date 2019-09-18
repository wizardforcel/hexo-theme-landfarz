hexo.extend.tag.register('tag_link', function(args){
  const tag = args[0];
  const text = args[1];
  return `<A HREF=/nplus_doc/tags/${tag}/>${text}</A>`;
});
