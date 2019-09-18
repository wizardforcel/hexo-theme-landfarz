
const rTable = / *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/g;

hexo.extend.filter.register('before_post_render', function(data) {
  data.content = data.content.replace(rTable, (content, header, align, body) => {

    var headerContents = header.split('|').map(content => {
      return {
        isNoContent: content === '',
        isHeader: true,
        rowspan: content.match(/!.*(r[1-9]).*!/) != null ? Number(content.match(/!.*(r[1-9]).*!/)[1].substring(1)) || 1 : 1,
        colspan: content.match(/!.*(c[1-9]).*!/) != null ? Number(content.match(/!.*(c[1-9]).*!/)[1].substring(1)) || 1 : 1,
        content: content.replace(/!.*!/, ''),
        isCombined: content === '^' || content === '<'
      };
    });
    headerContents.pop(); // 末尾に邪魔な要素がいる
  
    const lines = body.split('\n');
    var cellContents = lines.map((line) => {
      var cells = line.split('|').map(cell => {
        return {
          isNoContent: cell === '',
          isHeader: cell.match(/!.*h.*!/) != null,
          // row, colともに1桁のみ対応。2桁以上は必要になり次第実装する
          rowspan: cell.match(/!.*(r[1-9]).*!/) != null ? Number(cell.match(/!.*(r[1-9]).*!/)[1].substring(1)) || 1 : 1,
          colspan: cell.match(/!.*(c[1-9]).*!/) != null ? Number(cell.match(/!.*(c[1-9]).*!/)[1].substring(1)) || 1 : 1,
          content: cell.replace(/!.*!/, ''),
          isCombined: cell === '^' || cell === '<'
        }
      });
      cells.shift();
      cells.pop();
      return cells;
    });
  
    // text align
    var textAlign = align.split('|').map(align => {
      if (align.match(/^:-*:$/)) {
        return "center";
      } else if (align.match(/^-*:$/)) {
        return "right";
      }
      return "left";
    });
  
    var thead = `<thead><tr>${headerContents.map((cell) => {
        if (cell.isCombined) {
          return "";
        }
        return `<th style="text-align:center" rowspan=${cell.rowspan} colspan=${cell.colspan}>${cell.content}</th>`;
      }).join('')}</tr></thead>`;
  
    var tbody = `<tbody>${cellContents.map((line) => {
        return `<tr>${line.map((cell, cellIndex) => {
          if (cell.isCombined) {
            return "";
          }
          const tag = cell.isHeader ? `th` : `td`;
          return `<${tag} style="text-align:${cell.isHeader ? "center" : textAlign[cellIndex]}" rowspan=${cell.rowspan} colspan=${cell.colspan}>${cell.content}</${tag}>`
        }).join('')}</tr>`;
      }).join('')}</tbody>`;
  
    return `<table>${thead}${tbody}</table>`;
  });
  return data;
});
