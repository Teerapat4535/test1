'use babel';

import KeyView from './key-view';
import { CompositeDisposable } from 'atom';

export default {

  keyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.keyView = new KeyView(state.keyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.keyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'key:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.keyView.destroy();
  },

  serialize() {
    return {
      keyViewState: this.keyView.serialize()
    };
  },

  toggle() {
    console.log('Key was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
