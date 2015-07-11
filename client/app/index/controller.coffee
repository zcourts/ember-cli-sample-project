`import Ember from 'ember'`

IndexController = Ember.Controller.extend
  actions:
    ok: ->
      @set 'ok', true
      @set 'cancel', false
      console.log "Ok clicked..."
    cancel: ->
      @set 'ok', false
      @set 'cancel', true
      console.log "Cancel clicked..."

`export default IndexController`
