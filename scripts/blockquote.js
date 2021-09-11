hexo.extend.tag.register('blockquote', function(args, content){
  const title = args[0];
  const cite = args.length > 1 ? args[1] : null;
  return `<blockquote><p>${content.replace(/\n/g, '\n<br />')}</p><p>${cite ? `<a href=${cite}>${title}</a>` : `${title}`}</p></blockquote>`;
}, { ends: true });
