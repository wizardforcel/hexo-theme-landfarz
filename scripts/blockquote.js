hexo.extend.tag.register('blockquote', function(args, content){
  const title = args[0];
  return `<blockquote title="${title}"><p>${content}</p></blockquote>`;
}, { ends: true });
