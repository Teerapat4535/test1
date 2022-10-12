'use babel';

import SEOView from './s-e-o-view';
import { CompositeDisposable } from 'atom';

export default {

  sEOView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sEOView = new SEOView(state.sEOViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sEOView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      's-e-o:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sEOView.destroy();
  },

  serialize() {
    return {
      sEOViewState: this.sEOView.serialize()
    };
  },

  toggle() {
    console.log('SEO was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
