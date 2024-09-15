import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root) {
    super($root, { name: 'Formula', listener: ['input'] });
  }

  toHTML() {
    return ` <div class="info">fx</div>
          <div
            class="input"
            contenteditable
            spellcheck="false"></div>`;
  }
  onInput(evt) {
    console.log('Formula listeners inptu', evt.target.textContent.trim());
  }

  // onClick(evt) {
  //   this.removeInit();
  //   console.log('Formula listeners click', evt.target);
  // }
}
