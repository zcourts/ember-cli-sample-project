`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  model: ->
    return @store.createRecord 'user'

`export default IndexRoute`
