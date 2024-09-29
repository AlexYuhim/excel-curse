import { $ } from '@/core/Dom';
export function resizeTable($root, event) {
  const $resizer = $(event.target);
  const typeResizer = event.target.dataset.resizer;
  console.log(' $resizer', $resizer.$el);
  let valueMove;
  const $parent = $resizer.closest('[data-col]');
  const $coord = $parent.coords();
  const $allCol = $root.all(`[data-col="${$parent.data.col}"]`);
  const propTypeEl = typeResizer === 'col' ? 'height' : 'width';
  const propType = typeResizer === 'col' ? '100vh' : '100vw';

  $resizer.css({
    opacity: '1',
    [propTypeEl]: propType,
  });
  document.onmousemove = (e) => {
    if (typeResizer === 'col') {
      valueMove = e.pageX - $coord.right;

      $parent.css({
        width: $coord.width + valueMove + 'px',
      });
    } else {
      valueMove = e.pageY - $coord.bottom;
      $parent.css({
        height: $coord.height + valueMove + 'px',
      });
    }
  };

  document.onmouseup = () => {
    $resizer.css({
      opacity: 0,
    });
    $allCol.forEach((col) => {
      col.style.width =
        $coord.width + valueMove < 0 ? '40px' : $coord.width + valueMove + 'px';
    });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
