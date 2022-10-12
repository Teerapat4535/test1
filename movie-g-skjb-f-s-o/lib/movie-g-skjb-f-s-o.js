'use babel';

import MovieGSkjbFSOView from './movie-g-skjb-f-s-o-view';
import { CompositeDisposable } from 'atom';

export default {

  movieGSkjbFSOView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.movieGSkjbFSOView = new MovieGSkjbFSOView(state.movieGSkjbFSOViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.movieGSkjbFSOView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'movie-g-skjb-f-s-o:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.movieGSkjbFSOView.destroy();
  },

  serialize() {
    return {
      movieGSkjbFSOViewState: this.movieGSkjbFSOView.serialize()
    };
  },

  toggle() {
    console.log('MovieGSkjbFSO was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
