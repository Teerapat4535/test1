'use babel';

import TestbetaView from './testbeta-view';
import { CompositeDisposable } from 'atom';

export default {

  testbetaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testbetaView = new TestbetaView(state.testbetaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testbetaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'testbeta:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testbetaView.destroy();
  },

  serialize() {
    return {
      testbetaViewState: this.testbetaView.serialize()
    };
  },

  toggle() {
    console.log('Testbeta was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
