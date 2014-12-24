import Ember from 'ember';
import SlGridMixin from 'sl-ember-components/mixins/sl-grid-controller';

export default Ember.ArrayController.extend(SlGridMixin, {
  gridDefinition: {
    options: {
      rowExpander: true,
      settingsMenu: {
        translationKeys: {
          actions: 'ACTIONS',
          columns: 'COLUMNS',
          resetColumnsToDefaults: 'RESETCOLUMNS'
        },
        actions: [
          {
            label: 'TESTACTION',
            action: 'testAction'
          }
        ],
        hideableColumns: true
      }
    },
    columns: [
      {
        component: 'sl-grid-table-cell-row-expander',
        cssClass: 'sl-grid-table-cell-row-expander',
        cssThClass: 'sl-grid-table-cell-row-expander',
        fixedWidth: 30
      },
      {
        key: 'name',
        title: 'HOSTNAME',
        defaultText: 'translateas.UNKNOWNDEVICE',
        sortable: true,
        resizable: true,
        widthHint: 2
      }
    ]
  },
  accessToken: function () {
    //var currentUser = this.get('user');
    console.log(this.get('model'));
  }.property('accessToken')
});
