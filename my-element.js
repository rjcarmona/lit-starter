import {LitElement, html, css} from 'lit-element';
import {ScopedElementsMixin} from '@open-wc/scoped-elements/lit-element.js';
import {LionSwitch} from '@lion/ui/switch.js';

export class DdElement extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return css`
      .wrapper {
        width: 370px;
        margin: 85px auto 0;
      }

      .select-btn,
      li {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .select-btn {
        height: 50px;
        width: 370px;
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0 20px;
        font-size: 16px;
        background: #fff;
        justify-content: space-between;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .select-btn i {
        font-size: 31px;
        transition: transform 0.3s linear;
      }

      .wrapper.active .select-btn i {
        transform: rotate(-180deg);
      }

      .content {
        padding: 20px;
        margin-top: 15px;
        background: #fff;
        border-radius: 7px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .wrapper.active .content {
        display: block;
      }

      .content .search {
        position: relative;
      }

      .search i {
        top: 50%;
        left: 15px;
        color: #999;
        font-size: 20px;
        pointer-events: none;
        transform: translateY(-50%);
        position: absolute;
      }

      .search input {
        height: 35px;
        width: 80%;
        outline: none;
        font-size: 16px;
        border-radius: 5px;
        padding: 0 20px 0 43px;
        border: 1px solid #b3b3b3;
      }

      .search input:focus {
        padding-left: 42px;
        border: 2px solid #4285f4;
      }

      .search input::placeholder {
        color: #bfbfbf;
      }

      .content .options {
        margin-top: 10px;
        max-height: 250px;
        overflow-y: auto;
        padding-right: 7px;
        padding-inline-start: 0;
      }

      .options::-webkit-scrollbar {
        width: 7px;
      }

      .options::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 25px;
      }

      .options::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 25px;
      }

      .options::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
      }

      .options button {
        background: #fff;
        border: none;
        font-size: 16px;
        padding: 15px;
        padding-left: 10px;
        width: 100%;
        text-align: left;
        cursor: pointer;
      }

      .options button:hover {
        border-radius: 5px;
        background: #f2f2f2;
      }

      .uil--angle-down {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M17 9.17a1 1 0 0 0-1.41 0L12 12.71L8.46 9.17a1 1 0 0 0-1.41 0a1 1 0 0 0 0 1.42l4.24 4.24a1 1 0 0 0 1.42 0L17 10.59a1 1 0 0 0 0-1.42'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
      }

      .uil--search {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
      }
    `;
  }

  static get scopedElements() {
    return {
      'lion-switch': LionSwitch,
    };
  }

  constructor() {
    super();
    this.igcData = [
      {name: 'IGC1'},
      {name: 'IGC2'},
      {name: 'IGC3'},
      {name: 'IGC4'},
    ];
    this.query = '';
    this.displayVal = 'none';
    this.btnValue = 'Select IGC';
  }

  render() {
    return html` ${this.renderDd()} `;
  }

  updateQuery(event) {
    this.query = event.target.value;
    this.requestUpdate();
  }

  get filteredItems() {
    return this.igcData.filter((item) =>
      item?.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  renderDd() {
    return html`
      <div class="wrapper">
        <button @click="${this.handleDdVisibility}" class="select-btn">
          <span>${this.btnValue}</span>
          <i class="uil uil--angle-down"></i>
        </button>
        <div class="content" style="display: ${this.displayVal};">
          <div class="search">
            <i class="uil uil--search"></i>
            <input
              @input="${this.updateQuery}"
              .value="${this.query}"
              spellcheck="false"
              type="text"
              placeholder="Search"
            />
          </div>
          <ul class="options">
            ${this.filteredItems?.length
              ? html`
                  ${this.filteredItems?.map(
                    (igc) =>
                      html`<button @click="${() => this._onSelectIgc(igc)}">
                        ${igc.name}
                      </button>`
                  )}
                `
              : html`<p style="margin-top: 10px;">IGC not found</p>`}
          </ul>
        </div>
        <lion-input label="First Name"></lion-input>
      </div>
      <lion-switch></lion-switch>
    `;
  }

  handleDdVisibility() {
    this.displayVal = this.displayVal === 'none' ? 'block' : 'none';
    this.requestUpdate();
  }

  _onSelectIgc(igc) {
    this.btnValue = igc.name;
    this.displayVal = 'none';
    this.requestUpdate();
  }
}

window.customElements.define('my-element', DdElement);
